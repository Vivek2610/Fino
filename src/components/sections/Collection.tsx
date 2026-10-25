import React from 'react';
import { ArrowRight } from 'lucide-react';

const collectionCategories = [
  { name: 'Rings', index: '01', className: 'collection-card--rings', pieceIndex: 0 },
  { name: 'Necklaces', index: '02', className: 'collection-card--necklaces', pieceIndex: 1 },
  { name: 'Earrings', index: '03', className: 'collection-card--earrings', pieceIndex: 4 },
  { name: 'Bracelets', index: '04', className: 'collection-card--bracelets', pieceIndex: 2 },
];

export default function Collection() {
  return (
    <section className="collection ivory-section" id="collection" aria-labelledby="collection-title">
      <div className="section-heading">
        <div>
          <span className="kicker">The collection</span>
          <h2 id="collection-title">Sculptural by instinct.</h2>
        </div>
        <p>
          A considered edit of forms designed to hold their own. Approved catalogue imagery can be placed into this editorial framework.
        </p>
      </div>
      <div className="collection-grid">
        {collectionCategories.map((category) => (
          <article className={`collection-card ${category.className}`} key={category.name}>
            <div className="collection-card__visual" aria-label={`${category.name} photography placeholder`}>
              <div className="specimen-shape" aria-hidden="true" />
            </div>
            <div className="collection-card__meta">
              <h3>{category.name}</h3>
              <a href="#contact" aria-label={`Enquire about ${category.name}`}>
                Explore <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
