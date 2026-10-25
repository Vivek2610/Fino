import React from 'react'

export interface LogoPieceData {
  index: number
  name: string
  src: string
  minX: number
  minY: number
  w: number
  h: number
  relX: number
  relY: number
  relW: number
  relH: number
}

export const LOGO_WIDTH = 262
export const LOGO_HEIGHT = 343

export const logoPieces: LogoPieceData[] = [
  {
    index: 0,
    name: 'Top Diamond',
    src: '/assets/logo-pieces/piece-0.png',
    minX: 0,
    minY: 2,
    w: 95,
    h: 136,
    relX: 0 / 262,
    relY: 2 / 343,
    relW: 95 / 262,
    relH: 136 / 343,
  },
  {
    index: 1,
    name: 'Top Parallelogram',
    src: '/assets/logo-pieces/piece-1.png',
    minX: 68,
    minY: 0,
    w: 128,
    h: 62,
    relX: 68 / 262,
    relY: 0 / 343,
    relW: 128 / 262,
    relH: 62 / 343,
  },
  {
    index: 2,
    name: 'Top Right Triangle',
    src: '/assets/logo-pieces/piece-2.png',
    minX: 156,
    minY: 0,
    w: 106,
    h: 61,
    relX: 156 / 262,
    relY: 0 / 343,
    relW: 106 / 262,
    relH: 61 / 343,
  },
  {
    index: 3,
    name: 'Middle Left Triangle',
    src: '/assets/logo-pieces/piece-3.png',
    minX: 0,
    minY: 94,
    w: 40,
    h: 98,
    relX: 0 / 262,
    relY: 94 / 343,
    relW: 40 / 262,
    relH: 98 / 343,
  },
  {
    index: 4,
    name: 'Middle Horizontal Diamond',
    src: '/assets/logo-pieces/piece-4.png',
    minX: 60,
    minY: 106,
    w: 131,
    h: 70,
    relX: 60 / 262,
    relY: 106 / 343,
    relW: 131 / 262,
    relH: 70 / 343,
  },
  {
    index: 5,
    name: 'Bottom Diamond',
    src: '/assets/logo-pieces/piece-5.png',
    minX: 0,
    minY: 144,
    w: 99,
    h: 147,
    relX: 0 / 262,
    relY: 144 / 343,
    relW: 99 / 262,
    relH: 147 / 343,
  },
  {
    index: 6,
    name: 'Bottom Left Triangle',
    src: '/assets/logo-pieces/piece-6.png',
    minX: 0,
    minY: 246,
    w: 40,
    h: 97,
    relX: 0 / 262,
    relY: 246 / 343,
    relW: 40 / 262,
    relH: 97 / 343,
  },
]

type LogoMarkProps = {
  className?: string
  title?: string
}

type LogoPieceProps = {
  index: number
  className?: string
  size?: number
  rotation?: number
  opacity?: number
}

export function LogoMark({
  className = '',
  title = 'FINO Jewellery geometric F logo',
}: LogoMarkProps) {
  return (
    <div
      className={`logo-mark ${className}`}
      role="img"
      aria-label={title}
      style={{
        position: 'relative',
        display: 'inline-block',
        aspectRatio: `${LOGO_WIDTH} / ${LOGO_HEIGHT}`,
        width: '100%',
        maxWidth: '120px',
      }}
    >
      <img
        src="/assets/fino-logo-clean.png"
        alt={title}
        className="logo-mark__image"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0 6px 20px rgba(197, 160, 89, 0.35))',
        }}
      />
    </div>
  )
}

export function LogoPiece({
  index,
  className = '',
  size = 32,
  rotation = 0,
  opacity = 1,
}: LogoPieceProps) {
  const piece = logoPieces[index]
  if (!piece) return null

  return (
    <img
      src={piece.src}
      className={`logo-piece-solo ${className}`}
      width={size}
      height={size * (piece.h / piece.w)}
      style={{
        width: `${size}px`,
        height: `${size * (piece.h / piece.w)}px`,
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        opacity,
        objectFit: 'contain',
        display: 'inline-block',
      }}
      alt=""
      aria-hidden="true"
    />
  )
}

export default LogoMark
