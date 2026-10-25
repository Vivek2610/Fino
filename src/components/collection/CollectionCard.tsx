import React from 'react';
import { ArrowRight, Gem } from 'lucide-react';
import type { CollectionItem } from '../../types';

interface CollectionCardProps {
  item: CollectionItem;
  variant?: 'hero-7' | 'tall-5' | 'standard-4';
  onEnquire?: (item: CollectionItem) => void;
  onViewDetails?: (item: CollectionItem) => void;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  item,
  variant = item.spanCol || 'standard-4',
  onEnquire,
  onViewDetails
}) => {
  const isHero = variant === 'hero-7';
  const isTall = variant === 'tall-5';

  return (
    <article
      className={`v2-product-card figma-collection-card ${
        isHero
          ? 'figma-collection-card--hero'
          : isTall
          ? 'figma-collection-card--tall'
          : 'figma-collection-card--standard'
      }`}
      id={`suite-${item.id}`}
    >
      {/* Top Meta: Number & Archive Pill Badge */}
      <div className="figma-collection-card__header">
        <span className="figma-collection-card__number">{item.number}</span>
        <span className="figma-collection-card__badge">{item.badge}</span>
      </div>

      {/* Visual Image with Arch Framing (Matching Home Page & Figma Reference) */}
      <div className="v2-product-card__image figma-collection-card__image-container">
        <div className="figma-arch-wrapper">
          <img
            src={item.image}
            alt={item.title}
            className="figma-arch-img"
            loading="lazy"
          />
          <div className="figma-arch-shadow-overlay" />
        </div>
        {item.carats && (
          <div className="figma-carat-tag">
            <Gem className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{item.carats}</span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="v2-product-card__body figma-collection-card__body">
        <small className="figma-collection-card__kicker">
          {item.collectionName}
        </small>

        <h3 className="figma-collection-card__title">
          {item.title}
        </h3>

        {item.subtitle && (
          <span className="figma-collection-card__subtitle">
            {item.subtitle}
          </span>
        )}

        <p className="figma-collection-card__desc">
          {item.description}
        </p>

        {/* Action Buttons matching reference image */}
        <div className="figma-collection-card__actions-row">
          <button
            type="button"
            className="v2-button v2-button--dark figma-btn-enquire"
            onClick={() => onEnquire?.(item)}
          >
            <span>{isHero || isTall ? 'ENQUIRE WITH CONCIERGE' : 'REQUEST VIEWING'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {(isHero || isTall) && (
            <button
              type="button"
              className="figma-btn-details"
              onClick={() => onViewDetails?.(item)}
            >
              <span>VIEW SUITE DETAILS</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default CollectionCard;
