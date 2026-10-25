import { useId } from 'react'

type LogoMarkProps = {
  className?: string
  title?: string
  animated?: boolean
}

type LogoPieceProps = {
  index: number
  className?: string
  size?: number
  rotation?: number
  opacity?: number
}

export const logoPieces = [
  { points: '84,10 120,64 84,122 50,64', tone: 'light' },
  { points: '102,10 176,10 220,62 154,62', tone: 'mid' },
  { points: '190,10 284,10 226,62', tone: 'light' },
  { points: '50,82 78,122 50,164', tone: 'mid' },
  { points: '84,132 154,96 214,132 154,168', tone: 'light' },
  { points: '84,142 124,210 84,278 44,210', tone: 'mid' },
  { points: '50,242 78,282 50,324', tone: 'dark' },
]

export function LogoMark({
  className = '',
  title = 'FINO Jewellery geometric F logo',
  animated = false,
}: LogoMarkProps) {
  const id = useId().replace(/:/g, '')

  return (
    <svg
      className={`logo-mark ${className}`}
      viewBox="24 0 280 338"
      role="img"
      aria-label={title}
      data-animated={animated ? 'true' : 'false'}
    >
      <defs>
        <linearGradient id={`${id}-light`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff0a8" />
          <stop offset=".25" stopColor="#e6bb54" />
          <stop offset=".58" stopColor="#b77a18" />
          <stop offset=".78" stopColor="#f4d67b" />
          <stop offset="1" stopColor="#996213" />
        </linearGradient>
        <linearGradient id={`${id}-mid`} x1=".15" y1="0" x2=".85" y2="1">
          <stop offset="0" stopColor="#c38f2b" />
          <stop offset=".42" stopColor="#f2cf70" />
          <stop offset=".62" stopColor="#b87818" />
          <stop offset="1" stopColor="#e5b748" />
        </linearGradient>
        <linearGradient id={`${id}-dark`} x1="0" y1="0" x2="1" y2=".5">
          <stop offset="0" stopColor="#8f5d13" />
          <stop offset=".52" stopColor="#dba93c" />
          <stop offset="1" stopColor="#f6df91" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className="logo-mark__pieces" filter={`url(#${id}-glow)`}>
        {logoPieces.map((piece, index) => (
          <polygon
            key={piece.points}
            className="logo-piece"
            data-piece={index}
            points={piece.points}
            fill={`url(#${id}-${piece.tone})`}
            stroke="#f5dc88"
            strokeWidth="0.75"
          />
        ))}
      </g>
    </svg>
  )
}

export function LogoPiece({
  index,
  className = '',
  size = 32,
  rotation = 0,
  opacity = 1,
}: LogoPieceProps) {
  const id = useId().replace(/:/g, '')
  const piece = logoPieces[index]
  if (!piece) return null

  // Compute tight bounding box from the polygon points
  const nums = piece.points.split(/[ ,]+/).map(Number)
  const xs = nums.filter((_, i) => i % 2 === 0)
  const ys = nums.filter((_, i) => i % 2 === 1)
  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  const w = Math.max(...xs) - minX
  const h = Math.max(...ys) - minY

  const gradId = `${id}-${piece.tone}`

  return (
    <svg
      className={`logo-piece-solo ${className}`}
      viewBox={`${minX} ${minY} ${w} ${h}`}
      width={size}
      height={size * (h / w)}
      style={{ transform: rotation ? `rotate(${rotation}deg)` : undefined, opacity }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {piece.tone === 'light' && (
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff0a8" />
            <stop offset=".25" stopColor="#e6bb54" />
            <stop offset=".58" stopColor="#b77a18" />
            <stop offset=".78" stopColor="#f4d67b" />
            <stop offset="1" stopColor="#996213" />
          </linearGradient>
        )}
        {piece.tone === 'mid' && (
          <linearGradient id={gradId} x1=".15" y1="0" x2=".85" y2="1">
            <stop offset="0" stopColor="#c38f2b" />
            <stop offset=".42" stopColor="#f2cf70" />
            <stop offset=".62" stopColor="#b87818" />
            <stop offset="1" stopColor="#e5b748" />
          </linearGradient>
        )}
        {piece.tone === 'dark' && (
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2=".5">
            <stop offset="0" stopColor="#8f5d13" />
            <stop offset=".52" stopColor="#dba93c" />
            <stop offset="1" stopColor="#f6df91" />
          </linearGradient>
        )}
      </defs>
      <polygon
        points={piece.points}
        fill={`url(#${gradId})`}
        stroke="#f5dc88"
        strokeWidth="1"
      />
    </svg>
  )
}
