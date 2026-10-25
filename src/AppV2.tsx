import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    ArrowDown,
    ArrowRight,
    ExternalLink,
    MapPin,
    Pause,
    Play,
} from 'lucide-react'
import { LogoMark } from './components/LogoMark'
import { JourneyPieces } from './components/JourneyPieces'
import { createLogoJourney } from './journey/logoJourney'
import { Header, Wordmark } from './components/common/Header'
import { Footer } from './components/common/Footer'
import { CollectionPage } from './pages/CollectionPage'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const collections = [
    { name: 'Necklaces', image: '/assets/rings.png', note: 'Sculptural silhouettes' },
    { name: 'Rings', image: '/assets/emerald.png', note: 'Bold emerald forms' },
    { name: 'Cufflinks', image: '/assets/cufflinks.png', note: 'Architectural details' },
    { name: 'Bridal', image: '/assets/bridal.png', note: 'Ceremonial statements' },
]

function Facet({ className = '' }: { className?: string }) {
    return <span className={`facet-accent ${className}`} aria-hidden="true" />
}

/** A landing slot where a travelling logo fragment docks and becomes the section's accent. */
function Dock({ name, className = '' }: { name: string; className?: string }) {
    return (
        <span className={`facet-dock ${className}`} data-dock={name} aria-hidden="true">
            <Facet />
        </span>
    )
}

function Hero({ onExplore }: { onExplore?: () => void }) {
    return (
        <section className="v2-hero" id="home" aria-labelledby="hero-title">
            <img className="v2-hero__image" src="/assets/hero.png" alt="" />
            <div className="v2-hero__shade" />
            <div className="v2-hero__grid">
                <div className="v2-hero__copy">
                    <div className="v2-overline">
                        <Facet />
                        Maison FINO Jewellery
                    </div>
                    <LogoMark className="v2-hero__mark" title="FINO Jewellery geometric F logo" />
                    <h1 id="hero-title">
                        Bold by Nature.
                        <em>Golden by Design.</em>
                    </h1>
                    <p>Jewellery defined by form, character, and timeless elegance.</p>
                    <a
                        className="v2-button v2-button--gold"
                        href="#collections"
                        onClick={(e) => {
                            if (onExplore) {
                                e.preventDefault()
                                onExplore()
                            }
                        }}
                    >
                        Explore the Collection <ArrowRight aria-hidden="true" />
                    </a>
                </div>
                <div className="v2-hero__count" aria-hidden="true">
                    <span>01</span>
                    <i />
                    <span>05</span>
                </div>
            </div>
            <a className="v2-scroll" href="#philosophy" aria-label="Continue to our story">
                Scroll to discover <ArrowDown />
            </a>
        </section>
    )
}

function Philosophy() {
    return (
        <section className="v2-philosophy v2-ivory" id="philosophy" aria-labelledby="philosophy-title">
            <figure className="arch-image">
                <img src="/assets/atelier.png" alt="Jewellery artisan working at a bench" />
                <div className="arch-image__facet">
                    <Dock name="philosophy-arch" />
                </div>
            </figure>
            <div className="v2-philosophy__copy">
                <div className="v2-overline v2-overline--dark">
                    <Dock name="philosophy-kicker" /> Our design language
                </div>
                <h2 id="philosophy-title">
                    Born from bold form,
                    <em>Sculpted in Gold <Dock name="philosophy-sub" /></em>
                </h2>
                <p>
                    An architectural dialogue between faceted gold, vivid emerald tones,
                    and a distinctly individual point of view.
                </p>
                <div className="design-notes">
                    <span>
                        <Dock name="note-0" />
                        <b>01</b> Form
                    </span>
                    <span>
                        <Dock name="note-1" />
                        <b>02</b> Light
                    </span>
                    <span>
                        <Dock name="note-2" />
                        <b>03</b> Character
                    </span>
                </div>
                <a className="v2-underlined-link" href="#film">
                    <Dock name="philosophy-link" /> Discover the FINO philosophy <ArrowRight />
                </a>
            </div>
        </section>
    )
}

function Collection({ onOpenCollection }: { onOpenCollection?: () => void }) {
    return (
        <section className="v2-collection v2-ivory" id="collection" aria-labelledby="collection-title">
            <div className="v2-section-heading">
                <div>
                    <div className="v2-overline v2-overline--dark">
                        <Dock name="collection-kicker" /> The collection
                    </div>
                    <h2 id="collection-title">Permanent Forms</h2>
                </div>
                <p>Explore FINO through a restrained, editorial collection of jewellery categories.</p>
            </div>
            <div className="v2-card-grid">
                {collections.map((item, index) => (
                    <article className="v2-product-card" key={item.name}>
                        <div className="v2-product-card__image">
                            <img src={item.image} alt={`${item.name} collection`} />
                            <span className="v2-image-label">Collection 0{index + 1}</span>
                            <Dock name={`card-${index}`} className="v2-product-card__facet" />
                        </div>
                        <div className="v2-product-card__body">
                            <small>{item.note}</small>
                            <h3>{item.name}</h3>
                            <div className="v2-product-card__footer">
                                <span>Discover the collection</span>
                                <a
                                    href="#collections"
                                    onClick={(e) => {
                                        if (onOpenCollection) {
                                            e.preventDefault()
                                            onOpenCollection()
                                        }
                                    }}
                                    aria-label={`Explore ${item.name}`}
                                >
                                    Explore <ArrowRight />
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

function BrandFilm() {
    const [playing, setPlaying] = useState(true)

    return (
        <section className="v2-film" id="film" aria-labelledby="film-title">
            <div className="v2-film__heading">
                <div className="v2-overline">
                    <Dock name="film-kicker" /> Cinematic atelier
                </div>
                <h2 id="film-title">The Master Goldsmiths</h2>
                <p>An intimate glimpse into form, light, and meticulous detail.</p>
            </div>
            <figure className={`v2-film__frame ${playing ? 'is-playing' : ''}`}>
                <img src="/assets/film.png" alt="Goldsmith working with glowing metal in a dark atelier" />
                <div className="v2-film__vignette" />
                <button
                    type="button"
                    className="v2-film__control"
                    onClick={() => setPlaying((value) => !value)}
                    aria-label={playing ? 'Pause visual preview' : 'Play visual preview'}
                >
                    {playing ? <Pause /> : <Play />}
                </button>
                <figcaption>
                    <span><i /> FINO atelier visual</span>
                    <span>Campaign film placeholder</span>
                </figcaption>
                <Dock name="film-one" className="v2-film__facet v2-film__facet--one" />
                <Dock name="film-two" className="v2-film__facet v2-film__facet--two" />
            </figure>
            <blockquote>
                “Bold does not shout; it holds its form.”
                <cite>— The FINO design philosophy</cite>
            </blockquote>
        </section>
    )
}

function Team() {
    return (
        <section className="v2-team v2-ivory" id="team" aria-labelledby="team-title">
            <div className="v2-section-heading">
                <div>
                    <div className="v2-overline v2-overline--dark">
                        <Dock name="team-kicker" /> Our team
                    </div>
                    <h2 id="team-title">The people behind the brilliance</h2>
                </div>
                <p>Profiles will be completed with approved portraits, names, and biographies.</p>
            </div>
            <div className="v2-team-grid">
                {[1, 2, 3].map((index) => (
                    <article className="v2-team-card" key={index}>
                        <div className="v2-team-card__portrait">
                            <span>0{index}</span>
                        </div>
                        <div>
                            <small>FINO Jewellery</small>
                            <h3>
                                <Dock name={`team-${index - 1}`} />
                                Team profile
                            </h3>
                            <p>Approved profile information to be supplied.</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

function MapArtwork() {
    return (
        <div className="v2-map" aria-hidden="true">
            <img src="/assets/map-base.svg" alt="" />
            <img src="/assets/map-grid.svg" alt="" />
            <img src="/assets/map-creek.svg" alt="" />
            <img src="/assets/map-roads.svg" alt="" />
            <img src="/assets/map-routes.svg" alt="" />
            <img className="v2-map__ring" src="/assets/map-ring.svg" alt="" />
            <img className="v2-map__ring" src="/assets/map-ring-inner.svg" alt="" />
            <img className="v2-map__pin" src="/assets/map-pin.svg" alt="" />
            <span className="v2-map__label">FINO · GOLD SOUK</span>
        </div>
    )
}

function Location() {
    return (
        <section className="v2-location v2-ivory" id="contact" aria-labelledby="location-title">
            <div className="v2-section-heading">
                <div>
                    <div className="v2-overline v2-overline--dark">
                        <Dock name="location-kicker" /> Our location
                    </div>
                    <h2 id="location-title">Our Boutique — Gold Souk</h2>
                </div>
                <p>The exact storefront address and map coordinates will be added after verification.</p>
            </div>
            <div className="v2-location__grid">
                <div className="v2-location-card">
                    <div className="v2-location-card__title">
                        <span><img src="/assets/figma-logo.png" alt="" /></span>
                        <div>
                            <small>FINO Jewellery</small>
                            <h3>Gold Souk — Dubai</h3>
                        </div>
                    </div>
                    <p>Visit FINO Jewellery in the historic heart of Dubai’s gold district.</p>
                    <div className="v2-location-card__details">
                        <MapPin aria-hidden="true" />
                        <address>
                            <strong>Location</strong>
                            Gold Souk, Dubai, United Arab Emirates
                        </address>
                    </div>
                    <a
                        className="v2-button v2-button--dark"
                        href="https://www.google.com/maps/search/?api=1&query=Gold+Souk+Dubai"
                        target="_blank"
                        rel="noreferrer"
                    >
                        View Gold Souk <ExternalLink />
                    </a>
                </div>
                <div className="v2-location__map">
                    <MapArtwork />
                    <div className="v2-reassembly">
                        <LogoMark className="v2-reassembly__mark" title="FINO Jewellery logo reassembled" />
                        <span>Gold returns home</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

function AppV2() {
    const app = useRef<HTMLDivElement>(null)
    const [currentPage, setCurrentPage] = useState<'home' | 'collections'>(() => {
        const hash = window.location.hash.toLowerCase()
        if (hash === '#collection' || hash === '#collections') return 'collections'
        return 'home'
    })

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.toLowerCase()
            if (hash === '#collection' || hash === '#collections') {
                setCurrentPage('collections')
            } else {
                setCurrentPage('home')
            }
        }
        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, [])

    const navigateTo = (page: 'home' | 'collections', targetHash?: string) => {
        setCurrentPage(page)
        if (page === 'collections') {
            window.location.hash = '#collections'
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            window.location.hash = targetHash || '#home'
            if (!targetHash || targetHash === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                setTimeout(() => {
                    const el = document.querySelector(targetHash)
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                }, 100)
            }
        }
    }

    useGSAP(
        () => {
            if (currentPage !== 'home') return

            const media = gsap.matchMedia()

            media.add(
                {
                    any: 'all',
                    reduceMotion: '(prefers-reduced-motion: reduce)',
                    mobile: '(max-width: 760px)',
                },
                (context) => {
                    const appEl = app.current
                    const { reduceMotion, mobile } = context.conditions ?? {}
                    if (!appEl || reduceMotion) return

                    // Entrance for hero copy only; the logo mark is excluded so the
                    // journey measures its untransformed geometry.
                    gsap.from('.v2-hero__copy > :not(.v2-hero__mark)', {
                        opacity: 0,
                        y: 28,
                        duration: 1,
                        stagger: 0.1,
                        ease: 'power3.out',
                    })

                    gsap.utils
                        .toArray<HTMLElement>('.v2-section-heading, .v2-philosophy__copy, .v2-film__heading')
                        .forEach((element) => {
                            gsap.from(element, {
                                opacity: 0,
                                y: 46,
                                duration: 0.9,
                                ease: 'power3.out',
                                scrollTrigger: { trigger: element, start: 'top 82%' },
                            })
                        })

                    gsap.from('.v2-product-card', {
                        opacity: 0,
                        y: 54,
                        stagger: 0.1,
                        duration: 0.85,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: '.v2-card-grid', start: 'top 80%' },
                    })

                    gsap.from('.v2-team-card', {
                        opacity: 0,
                        y: 44,
                        stagger: 0.12,
                        duration: 0.8,
                        scrollTrigger: { trigger: '.v2-team-grid', start: 'top 82%' },
                    })

                    // One scroll-driven system: hero logo fragments → section UI
                    // accents → reassembly at the location map.
                    const disposeJourney = createLogoJourney(appEl, { mobile: Boolean(mobile) })
                    return () => disposeJourney()
                },
            )

            return () => media.revert()
        },
        { scope: app, dependencies: [currentPage] },
    )

    return (
        <div className="v2-app" ref={app}>
            <a className="skip-link" href="#main-content">Skip to content</a>
            <Header currentPage={currentPage} onNavigate={navigateTo} />
            {currentPage === 'home' && <JourneyPieces />}
            <main id="main-content">
                {currentPage === 'home' ? (
                    <>
                        <Hero onExplore={() => navigateTo('collections')} />
                        <Philosophy />
                        <Collection onOpenCollection={() => navigateTo('collections')} />
                        <BrandFilm />
                        <Team />
                        <Location />
                    </>
                ) : (
                    <CollectionPage
                        onBackToHome={() => navigateTo('home')}
                        onNavigateToContact={() => navigateTo('home', '#contact')}
                    />
                )}
            </main>
            <Footer onNavigate={navigateTo} />
        </div>
    )
}

export default AppV2