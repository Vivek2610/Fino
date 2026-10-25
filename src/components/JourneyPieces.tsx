import { logoPieces } from './LogoMark'

export type PieceBounds = { minX: number; minY: number; w: number; h: number }

export const pieceBounds: PieceBounds[] = logoPieces.map((p) => ({
  minX: p.minX,
  minY: p.minY,
  w: p.w,
  h: p.h,
}))

export function JourneyPieces() {
  return (
    <div className="journey-pieces" aria-hidden="true">
      {logoPieces.map((piece) => (
        <img
          key={piece.index}
          src={piece.src}
          className="journey-piece"
          data-piece={piece.index}
          width={piece.w}
          height={piece.h}
          alt=""
          loading="eager"
          decoding="sync"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${piece.w}px`,
            height: `${piece.h}px`,
            objectFit: 'contain',
            pointerEvents: 'none',
            filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.28))',
          }}
        />
      ))}
    </div>
  )
}

export default JourneyPieces
