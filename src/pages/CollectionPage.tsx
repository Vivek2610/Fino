import React, { useState } from 'react';
import { collectionsData, collectionCategories } from '../data/collections';
import type { CollectionItem } from '../types';
import { CollectionCard } from '../components/collection/CollectionCard';
import { ArrowRight, Gem, Compass, Sparkles } from 'lucide-react';

interface CollectionPageProps {
  onBackToHome?: () => void;
  onNavigateToContact?: () => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  onBackToHome,
  onNavigateToContact
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL CREATIONS');

  const filteredItems = activeCategory === 'ALL CREATIONS'
    ? collectionsData
    : collectionsData.filter(item => item.category === activeCategory);

  const heroItem = filteredItems[0];
  const tallItem = filteredItems[1];
  const bottomItems = filteredItems.slice(2);

  return (
    <div className="collection-page-root v2-ivory">
      {/* 1. Hero Section: High Jewellery Suites */}
      <section className="figma-collection-hero" aria-labelledby="collections-page-title">
        <div className="figma-collection-hero__bg-radial" aria-hidden="true" />
        {/* Subtle Architectural Filigree Lines */}
        <div className="figma-collection-hero__filigree" aria-hidden="true">
          <div className="figma-filigree-v" />
          <div className="figma-filigree-v" />
          <div className="figma-filigree-v" />
        </div>

        <div className="figma-collection-hero__container">
          <div className="figma-collection-hero__tag">
            <span className="figma-collection-hero__tag-diamond" />
            <span className="figma-collection-hero__tag-text">
              SOVEREIGN HIGH JEWELLERY
            </span>
            <span className="figma-collection-hero__tag-diamond" />
          </div>

          <h1 id="collections-page-title" className="figma-collection-hero__title">
            High Jewellery Suites
          </h1>

          <div className="figma-collection-hero__divider">
            <div className="filigree-line" />
            <div className="filigree-diamond" />
            <div className="filigree-line" />
          </div>

          <p className="figma-collection-hero__desc">
            Each creation is a solitary masterpiece, inspired by the majesty of Middle Eastern heritage and modern golden architecture.
          </p>

          <div className="figma-collection-hero__provenance-badge">
            <span>CURATED EDITION № VIII</span>
            <span className="figma-provenance-dot">•</span>
            <span>ONE-OF-A-KIND PROVENANCE</span>
          </div>
        </div>
      </section>

      {/* 2. Filter Bar */}
      <nav className="figma-filter-bar" aria-label="Collections Filter">
        <div className="figma-filter-bar__container">
          {collectionCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`figma-filter-bar__btn ${isActive ? 'figma-filter-bar__btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isActive}
              >
                <span>{cat}</span>
                {isActive && <span className="figma-filter-bar__indicator" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 3. Bento & Editorial Grid */}
      <div className="figma-collection-grid-section">
        <div className="figma-collection-grid-container">
          {/* Top Bento Row: 01 Hero Card (7 cols) + 02 Tall Card (5 cols) */}
          <div className="figma-bento-top-row">
            {heroItem && (
              <div className="figma-bento-col-7">
                <CollectionCard
                  item={heroItem}
                  variant="hero-7"
                  onEnquire={() => onNavigateToContact?.()}
                />
              </div>
            )}
            {tallItem && (
              <div className="figma-bento-col-5">
                <CollectionCard
                  item={tallItem}
                  variant="tall-5"
                  onEnquire={() => onNavigateToContact?.()}
                />
              </div>
            )}
          </div>

          {/* Editorial Quote Interlude */}
          <div className="figma-editorial-interlude" role="region" aria-label="Maison Philosophy">
            <div className="figma-editorial-interlude__line" />
            <blockquote className="figma-editorial-interlude__quote">
              &ldquo;Jewellery is frozen light, shaped into sovereign geometry.&rdquo;
            </blockquote>
            <div className="figma-editorial-interlude__line" />
          </div>

          {/* Bottom Bento Row: 3 Column Cards */}
          <div className="figma-bento-bottom-row">
            {bottomItems.map((item) => (
              <div key={item.id} className="figma-bento-col-4">
                <CollectionCard
                  item={item}
                  variant="standard-4"
                  onEnquire={() => onNavigateToContact?.()}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. One-of-One Bespoke Commissions Section (Deep Emerald) */}
      <section className="figma-bespoke-atelier-section" aria-labelledby="bespoke-atelier-title">
        <div className="figma-bespoke-atelier__bg-radial" aria-hidden="true" />

        <div className="figma-bespoke-atelier__container">
          {/* Left Column: Manifesto */}
          <div className="figma-bespoke-atelier__manifesto">
            <div className="figma-bespoke-atelier__tag">
              <span className="figma-bespoke-atelier__tag-bar" />
              <span>HAUTE ATELIER &amp; COMMISSIONS</span>
            </div>

            <h2 id="bespoke-atelier-title" className="figma-bespoke-atelier__title">
              One-of-One Bespoke Commissions
            </h2>

            <p className="figma-bespoke-atelier__lead">
              For clients seeking an unrepeatable talisman, our Master Craftsmen convene private consultations to source rare sovereign gemstones and translate intimate narratives into enduring architectural treasures.
            </p>

            <div className="figma-bespoke-atelier__highlights">
              <div className="figma-bespoke-highlight-item">
                <div className="figma-bespoke-highlight-icon">
                  <Gem className="w-5 h-5 text-[#c5a059]" />
                </div>
                <div className="figma-bespoke-highlight-content">
                  <h3 className="figma-bespoke-highlight-heading">
                    RARE GEMSTONE SOURCING
                  </h3>
                  <p className="figma-bespoke-highlight-desc">
                    Direct ethical access to sovereign Colombian and Zambian vaults.
                  </p>
                </div>
              </div>

              <div className="figma-bespoke-highlight-item">
                <div className="figma-bespoke-highlight-icon">
                  <Compass className="w-5 h-5 text-[#c5a059]" />
                </div>
                <div className="figma-bespoke-highlight-content">
                  <h3 className="figma-bespoke-highlight-heading">
                    GOUACHE &amp; WAX PROTOTYPES
                  </h3>
                  <p className="figma-bespoke-highlight-desc">
                    Hand-rendered watercolor designs and tactile wax carvings prior to forge.
                  </p>
                </div>
              </div>
            </div>

            <div className="figma-bespoke-atelier__actions">
              <button
                type="button"
                className="v2-button v2-button--gold figma-bespoke-btn"
                onClick={() => onNavigateToContact?.()}
              >
                <span>ENQUIRE FOR PRIVATE ACQUISITION</span>
                <ArrowRight className="w-4 h-4" />
              </button>


            </div>
          </div>

          {/* Right Column: Visual Arch Window with Floating Stamp */}
          <div className="figma-bespoke-atelier__visual-col">
            <div className="figma-bespoke-atelier__arch-window">
              <img
                src="/assets/figma/a6816bcd23a1241e43a96aad6934aa47632c7399.jpg"
                alt="Master Craftsman in Fino Atelier"
                className="figma-bespoke-atelier__arch-img"
              />
              <div className="figma-bespoke-atelier__arch-overlay" />

              {/* Floating Gold Seal */}
              <div className="figma-floating-seal">
                <div className="figma-floating-seal__icon">
                  <Sparkles className="w-5 h-5 text-[#c5a059]" />
                </div>
                <div className="figma-floating-seal__info">
                  <span className="figma-floating-seal__title">MASTER ATELIER</span>
                  <span className="figma-floating-seal__sub">Geneva &amp; Dubai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionPage;
