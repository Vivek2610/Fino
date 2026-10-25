import { useId } from 'react'
import { logoPieces } from './LogoMark'

export type PieceBounds = { minX: number; minY: number; w: number; h: number }

const parseBounds = (points: string): PieceBounds => {
  const numbers = points.split(/[ ,]+/).map(Number)
  const xs = numbers.filter((_, index) => index % 2 === 0)
  const ys = numbers.filter((_, index) => index % 2 === 1)
  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  return { minX, minY, w: Math.max(...xs) - minX, h: Math.max(...ys) - minY }
}

export const pieceBounds = logoPieces.map((piece) => parseBounds(piece.points))

export function JourneyPieces() {
  const id = useId().replace(/:/g, '')

  return (
    <div className="journey-pieces" aria-hidden="true">
      <svg width="0" height="0" style={{ position: 'absolute' }} focusable="false">
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
        </defs>
      </svg>
      {logoPieces.map((piece, index) => {
        const bounds = pieceBounds[index]
        return (
          <svg
            key={piece.points}
            className="journey-piece"
            viewBox={`${bounds.minX} ${bounds.minY} ${bounds.w} ${bounds.h}`}
            width={bounds.w}
            height={bounds.h}
            overflow="visible"
          >
            <polygon
              points={piece.points}
              fill={`url(#${id}-${piece.tone})`}
              stroke="#f5dc88"
              strokeWidth="0.75"
            />
          </svg>
        )
      })}
    </div>
  )
}
