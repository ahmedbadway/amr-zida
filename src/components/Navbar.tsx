import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LogoMark from './LogoMark'
import type { Page } from '../types'

interface NavbarProps {
  page: Page
  onNav: (p: Page) => void
}

const links: { id: Page; label: string }[] = [
  { id: 'home',     label: 'Home'     },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact'  },
]

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function Navbar({ page, onNav }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const go = (p: Page) => { onNav(p); setMenuOpen(false) }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backgroundColor: scrolled || menuOpen ? 'rgba(15,16,17,0.92)' : 'rgba(15,16,17,0)',
        borderBottomColor: scrolled ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0)',
      }}
      transition={{ duration: 0.4 }}
      style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none' }}
    >
      <div className="max-w-6xl mx-auto px-8 md:px-12 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => go('home')}
          className="flex items-center gap-3 group"
          aria-label="AMR ZIADA — Home"
        >
          <LogoMark className="h-8 w-8 shrink-0 text-cream transition-colors duration-300 group-hover:text-walnut" />
          <span className="hidden sm:block font-logo text-[13px] font-semibold tracking-[0.28em] uppercase text-cream transition-colors duration-300 group-hover:text-walnut leading-none">
            AMR ZIADA
          </span>
        </button>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => onNav(l.id)}
              className={`relative text-[11px] tracking-[0.22em] uppercase transition-colors duration-200 pb-0.5 ${
                page === l.id ? 'text-cream' : 'text-cream/50 hover:text-cream/90'
              }`}
            >
              {l.label}
              {page === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-walnut"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <motion.button
          onClick={() => onNav('contact')}
          className="hidden md:inline-block text-[11px] tracking-[0.22em] uppercase px-5 py-2.5 border border-cream/30 text-cream/80 hover:text-cream hover:border-cream/60 transition-all duration-250"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Book Consult
        </motion.button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="md:hidden relative w-9 h-9 flex items-center justify-center text-cream"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="relative block w-5 h-[12px]">
            <motion.span
              className="absolute left-0 top-0 block h-px w-5 bg-cream"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
            <motion.span
              className="absolute left-0 bottom-0 block h-px w-5 bg-cream"
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="md:hidden overflow-hidden border-t border-white/6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="px-8 py-6 flex flex-col gap-1">
              {links.map(l => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className={`text-left font-display text-[22px] font-light py-2 transition-colors duration-200 ${
                    page === l.id ? 'text-walnut' : 'text-cream/80 hover:text-cream'
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => go('contact')}
                className="mt-4 text-center text-[11px] tracking-[0.25em] uppercase px-6 py-4 bg-cream text-charcoal"
              >
                Book Consult
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
