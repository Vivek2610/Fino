import { MapPin } from 'lucide-react'
import { Wordmark } from './Header'

export interface FooterProps {
  onNavigate?: (page: 'home' | 'collections') => void
}

export function Footer({ onNavigate }: FooterProps) {
  const navItems = [
    { label: 'Home', page: 'home' as const, href: '#home' },
    { label: 'Collection', page: 'collections' as const, href: '#collection' },
    { label: 'Our Team', page: 'home' as const, href: '#team' },
    { label: 'Contact', page: 'home' as const, href: '#contact' },
  ]

  const handleLinkClick = (page: 'home' | 'collections', href: string) => {
    if (onNavigate) {
      onNavigate(page)
    }
    if (page === 'home' && href !== '#home') {
      setTimeout(() => {
        const el = document.querySelector(href)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="v2-footer">
      <div className="v2-footer__brand">
        <img src="/assets/figma-logo.png" alt="" />
        <Wordmark tagline />
      </div>
      <nav aria-label="Footer navigation">
        {navItems.map((item) => (
          <a
            href={item.href}
            key={item.label}
            onClick={(e) => {
              e.preventDefault()
              handleLinkClick(item.page, item.href)
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="v2-footer__location">
        <MapPin />
        Gold Souk — Dubai, UAE
      </div>
      <div className="v2-footer__bottom">
        <span>© {new Date().getFullYear()} FINO Jewellery</span>
        <span>Social, policy, and support links pending verification.</span>
      </div>
    </footer>
  )
}
export default Footer
