import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

export interface HeaderProps {
  currentPage?: 'home' | 'collections'
  onNavigate?: (page: 'home' | 'collections') => void
}

export function Wordmark({ tagline = false }: { tagline?: boolean }) {
  return (
    <span className="v2-wordmark">
      <strong>Fino Jewellery</strong>
      {tagline && <small>Bold by Nature. Golden by Design.</small>}
    </span>
  )
}

export function Header({ currentPage = 'home', onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  const navItems = [
    { label: 'Home', page: 'home' as const, href: '#home' },
    { label: 'Collection', page: 'collections' as const, href: '#collection' },
    { label: 'Our Team', page: 'home' as const, href: '#team' },
    { label: 'Contact', page: 'home' as const, href: '#contact' },
  ]

  const handleLinkClick = (page: 'home' | 'collections', href: string) => {
    setOpen(false)
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
    <header className={`v2-header ${scrolled ? 'v2-header--scrolled' : ''}`}>
      <a
        className="v2-brand"
        href="#home"
        onClick={(e) => {
          e.preventDefault()
          handleLinkClick('home', '#home')
        }}
        aria-label="FINO Jewellery home"
      >
        <img src="/assets/figma-logo.png" alt="" />
        <Wordmark tagline />
      </a>
      <nav className="v2-desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const isActive =
            item.page === 'collections'
              ? currentPage === 'collections'
              : currentPage === 'home' && item.href === '#home'

          return (
            <a
              href={item.href}
              key={item.label}
              className={isActive ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick(item.page, item.href)
              }}
            >
              {item.label}
            </a>
          )
        })}
      </nav>
      <button
        className="v2-menu-button"
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="v2-mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        className={`v2-mobile-nav ${open ? 'v2-mobile-nav--open' : ''}`}
        id="v2-mobile-navigation"
        aria-label="Mobile navigation"
      >
        <img src="/assets/figma-logo.png" alt="" />
        {navItems.map((item, index) => (
          <a
            href={item.href}
            key={item.label}
            onClick={(e) => {
              e.preventDefault()
              handleLinkClick(item.page, item.href)
            }}
          >
            <span>0{index + 1}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
export default Header
