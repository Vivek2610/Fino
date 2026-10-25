import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { logoPieces, LOGO_WIDTH, LOGO_HEIGHT } from '../components/LogoMark'
import { pieceBounds } from '../components/JourneyPieces'

/* -------------------------------------------------------------------------- */
/*  Itinerary data                                                             */
/* -------------------------------------------------------------------------- */

/** One docking destination for a fragment: a `[data-dock]` slot in the UI. */
export type DockStop = {
  /** Matches a `data-dock` attribute on a real UI element. */
  dock: string
  /** Rotation (deg) while docked. Defaults to 0 so the facet reads as logo geometry. */
  rotation?: number
  /** How large the fragment renders relative to the slot's larger side. */
  fit?: number
  /** Set false to skip this stop on small screens (simplified mobile journey). */
  mobile?: boolean
}

/** Per-piece travel plan. Pieces are indexed in `logoPieces` order. */
export type PieceItinerary = {
  piece: number
  /** Stacking order inside the journey layer (higher = nearer the viewer). */
  depth: number
  stops: DockStop[]
}

export const itineraries: PieceItinerary[] = [
  {
    piece: 0, // Top Diamond
    depth: 7,
    stops: [
      { dock: 'philosophy-kicker' },
      { dock: 'film-kicker' },
      { dock: 'location-kicker' },
    ],
  },
  {
    piece: 1, // Top Parallelogram
    depth: 6,
    stops: [
      { dock: 'philosophy-arch', fit: 1.1 },
      { dock: 'film-one', fit: 1.15 },
    ],
  },
  {
    piece: 2, // Top Right Triangle
    depth: 5,
    stops: [
      { dock: 'philosophy-sub' },
      { dock: 'collection-kicker' },
      { dock: 'film-two', fit: 1.15 },
    ],
  },
  {
    piece: 3, // Middle Left Triangle
    depth: 4,
    stops: [
      { dock: 'note-0' },
      { dock: 'card-0' },
      { dock: 'team-0' },
    ],
  },
  {
    piece: 4, // Middle Horizontal Diamond
    depth: 3,
    stops: [
      { dock: 'note-1' },
      { dock: 'card-1', mobile: false },
      { dock: 'team-1' },
    ],
  },
  {
    piece: 5, // Bottom Diamond
    depth: 2,
    stops: [
      { dock: 'note-2' },
      { dock: 'card-2', mobile: false },
      { dock: 'team-2' },
    ],
  },
  {
    piece: 6, // Bottom Left Triangle
    depth: 1,
    stops: [
      { dock: 'philosophy-link' },
      { dock: 'card-3' },
      { dock: 'team-kicker' },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*  Geometry                                                                   */
/* -------------------------------------------------------------------------- */

const LOGO_VIEWBOX = { x: 0, w: LOGO_WIDTH, h: LOGO_HEIGHT }

type Point = { x: number; y: number; scale: number; rotation: number }
type Waypoint = Point & { dock: string; arrive: number; leave: number }
type PiecePlan = {
  piece: number
  depth: number
  origin: Point
  waypoints: Waypoint[]
  final: Point & { arrive: number }
}

type DocRect = { x: number; y: number; w: number; h: number }

/**
 * Document-space box of an HTML element using offset geometry. Unlike
 * getBoundingClientRect this ignores CSS/GSAP transforms, so docks measure
 * correctly even while a section reveal animation is mid-flight.
 */
const offsetDocRect = (el: HTMLElement): DocRect => {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight }
}

/** Document-space box via bounding rect (for SVG/image marks). */
const rectDocRect = (el: Element): DocRect => {
  const r = el.getBoundingClientRect()
  return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height }
}

/** Where piece `index` must sit so the seven pieces exactly cover a rendered LogoMark. */
const pieceOverMark = (mark: DocRect, index: number, rotation = 0): Point => {
  const s = mark.w / LOGO_VIEWBOX.w
  const b = pieceBounds[index]
  return { x: mark.x + b.minX * s, y: mark.y + b.minY * s, scale: s, rotation }
}

/** Where piece `index` must sit to be centred in (and sized to) a dock slot. */
const pieceInSlot = (slot: DocRect, index: number, stop: DockStop): Point => {
  const b = pieceBounds[index]
  const s = (Math.max(slot.w, slot.h) * (stop.fit ?? 1.15)) / Math.max(b.w, b.h)
  return {
    x: slot.x + slot.w / 2 - (b.w * s) / 2,
    y: slot.y + slot.h / 2 - (b.h * s) / 2,
    scale: s,
    rotation: stop.rotation ?? 0,
  }
}

/* -------------------------------------------------------------------------- */
/*  Itinerary evaluation                                                       */
/* -------------------------------------------------------------------------- */

type Segment = {
  from: Point
  to: Point
  start: number
  end: number
  ease: (t: number) => number
  /** Extra tumble (deg) at mid-flight; returns to 0 on arrival. */
  spin: number
  /** Sideways drift (px) at mid-flight for an organic, curved path. */
  drift: number
}

const arriveEase = gsap.parseEase('back.out(1.2)')
const assembleEase = gsap.parseEase('power2.inOut')
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Flattens a plan into travel segments; holds (docked time) are the gaps between them. */
const toSegments = (plan: PiecePlan): Segment[] => {
  const direction = plan.piece % 2 ? -1 : 1
  const segments: Segment[] = []
  let from = plan.origin
  let cursor = 0.02 + plan.piece * 0.006

  plan.waypoints.forEach((wp, k) => {
    segments.push({
      from,
      to: wp,
      start: cursor,
      end: wp.arrive,
      ease: arriveEase,
      spin: direction * (40 + k * 15),
      drift: direction * (18 + plan.piece * 4),
    })
    from = wp
    cursor = wp.leave
  })

  segments.push({
    from,
    to: plan.final,
    start: cursor,
    end: plan.final.arrive,
    ease: assembleEase,
    spin: direction * 45,
    drift: direction * 14,
  })
  return segments
}

/** Pure function of scroll progress: identical progress always yields identical state. */
const evaluate = (segments: Segment[], origin: Point, progress: number): Point => {
  let state = origin
  for (const seg of segments) {
    if (progress <= seg.start) return state
    if (progress < seg.end) {
      const raw = (progress - seg.start) / (seg.end - seg.start)
      const e = seg.ease(raw)
      const arc = Math.sin(Math.PI * raw)
      return {
        x: lerp(seg.from.x, seg.to.x, e) + seg.drift * arc,
        y: lerp(seg.from.y, seg.to.y, e),
        scale: lerp(seg.from.scale, seg.to.scale, e),
        rotation: lerp(seg.from.rotation, seg.to.rotation, e) + seg.spin * arc,
      }
    }
    state = seg.to
  }
  return state
}

/* -------------------------------------------------------------------------- */
/*  Journey controller                                                         */
/* -------------------------------------------------------------------------- */

export type JourneyOptions = { mobile: boolean }

/**
 * Creates the scroll-driven logo journey inside `root` and returns a cleanup.
 */
export function createLogoJourney(root: HTMLElement, { mobile }: JourneyOptions): () => void {
  const pieces = Array.from(root.querySelectorAll<HTMLElement>('.journey-piece'))
  const heroMark = root.querySelector<HTMLElement>('.v2-hero__mark')
  const finalMark = root.querySelector<HTMLElement>('.v2-reassembly__mark')
  const mapEl = root.querySelector<HTMLElement>('.v2-location__map')
  const finalLabel = root.querySelector<HTMLElement>('.v2-reassembly span')

  if (pieces.length !== logoPieces.length || !heroMark || !finalMark || !mapEl) {
    return () => {}
  }

  root.classList.add('js-journey')

  let endScroll = 1
  let plans: { plan: PiecePlan; segments: Segment[] }[] = []

  /* ---- Measurement phase (layout reads happen only here) ---------------- */
  const measure = () => {
    const vh = window.innerHeight
    const hero = rectDocRect(heroMark)
    const finalRect = rectDocRect(finalMark)
    const map = offsetDocRect(mapEl)

    // Journey spans page top → map centred in the viewport.
    endScroll = Math.max(1, map.y + map.h / 2 - vh / 2)
    const toT = (scrollValue: number) => gsap.utils.clamp(0.015, 0.9, scrollValue / endScroll)

    plans = itineraries.map(({ piece, depth, stops }) => {
      let cursor = 0.02 + piece * 0.006
      const waypoints: Waypoint[] = []

      stops
        .filter((stop) => !mobile || stop.mobile !== false)
        .forEach((stop) => {
          const slot = root.querySelector<HTMLElement>(`[data-dock="${stop.dock}"]`)
          if (!slot) return
          const rect = offsetDocRect(slot)
          // Arrive as the slot enters the lower viewport; rest; leave as it passes the upper third.
          const arrive = Math.max(toT(rect.y - vh * 0.8), cursor + 0.015)
          const leave = Math.max(toT(rect.y - vh * 0.32), arrive + 0.025)
          waypoints.push({ ...pieceInSlot(rect, piece, stop), dock: stop.dock, arrive, leave })
          cursor = leave
        })

      const plan: PiecePlan = {
        piece,
        depth,
        origin: pieceOverMark(hero, piece),
        waypoints,
        final: { ...pieceOverMark(finalRect, piece), arrive: Math.max(0.93 + piece * 0.005, cursor + 0.02) },
      }
      return { plan, segments: toSegments(plan) }
    })
  }

  /* ---- Render phase (no layout reads) ----------------------------------- */
  const setters = pieces.map((el) => ({
    x: gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' }),
    y: gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' }),
    scale: gsap.quickTo(el, 'scale', { duration: 0.5, ease: 'power3.out' }),
    rotation: gsap.quickTo(el, 'rotation', { duration: 0.5, ease: 'power3.out' }),
  }))

  const render = (progress: number, immediate = false) => {
    plans.forEach(({ plan, segments }) => {
      const state = evaluate(segments, plan.origin, progress)
      const el = pieces[plan.piece]
      if (immediate) {
        gsap.set(el, state)
        const s = setters[plan.piece]
        s.x(state.x, state.x)
        s.y(state.y, state.y)
        s.scale(state.scale, state.scale)
        s.rotation(state.rotation, state.rotation)
      } else {
        const s = setters[plan.piece]
        s.x(state.x)
        s.y(state.y)
        s.scale(state.scale)
        s.rotation(state.rotation)
      }
    })
    if (finalLabel) {
      finalLabel.style.opacity = String(gsap.utils.clamp(0, 1, (progress - 0.955) / 0.04))
    }
  }

  pieces.forEach((el, index) => {
    const depth = itineraries.find((it) => it.piece === index)?.depth ?? 1
    gsap.set(el, { transformOrigin: '0 0', zIndex: depth })
  })

  measure()
  render(0, true)

  const trigger = ScrollTrigger.create({
    trigger: root,
    start: 'top top',
    end: () => `+=${endScroll}`,
    onRefreshInit: measure,
    onRefresh: (self) => render(self.progress, true),
    onUpdate: (self) => render(self.progress),
  })

  /* ---- Invalidation ------------------------------------------------------ */
  let raf = 0
  let lastWidth = root.offsetWidth
  let lastHeight = root.offsetHeight
  const schedule = () => {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => ScrollTrigger.refresh())
  }

  const observer = new ResizeObserver(() => {
    if (root.offsetWidth === lastWidth && root.offsetHeight === lastHeight) return
    lastWidth = root.offsetWidth
    lastHeight = root.offsetHeight
    schedule()
  })
  observer.observe(root)

  const images = Array.from(root.querySelectorAll('img')).filter((img) => !img.complete)
  images.forEach((img) => img.addEventListener('load', schedule, { once: true }))
  document.fonts?.ready.then(schedule).catch(() => {})

  return () => {
    cancelAnimationFrame(raf)
    observer.disconnect()
    images.forEach((img) => img.removeEventListener('load', schedule))
    trigger.kill()
    gsap.killTweensOf(pieces)
    if (finalLabel) finalLabel.style.opacity = ''
    root.classList.remove('js-journey')
  }
}