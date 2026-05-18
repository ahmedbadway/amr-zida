import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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

export default function Navbar({ page, onNav }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backgroundColor: scrolled ? 'rgba(8,8,8,0.92)' : 'rgba(8,8,8,0)',
        borderBottomColor: scrolled ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0)',
      }}
      transition={{ duration: 0.4 }}
      style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', backdropFilter: scrolled ? 'blur(16px)' : 'none' }}
    >
      <div className="max-w-6xl mx-auto px-8 md:px-12 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => onNav('home')}
          className="flex items-center gap-3 group"
          aria-label="AMR ZIADA — Home"
        >
          {/* Mark: white Z on black — screen blend makes the black square invisible */}
          <img
            src="images/logo-mark.jpg"
            alt=""
            aria-hidden="true"
            className="h-9 w-auto object-contain shrink-0 transition-opacity duration-300 group-hover:opacity-65"
            style={{ mixBlendMode: 'screen' }}
          />
          {/* Wordmark text — hidden on mobile, shown sm+ */}
          <span className="hidden sm:block font-logo text-[13px] font-semibold tracking-[0.28em] uppercase text-cream transition-colors duration-300 group-hover:text-walnut leading-none">
            AMR ZIADA
          </span>
        </button>

        {/* Nav links */}
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

        {/* CTA */}
        <motion.button
          onClick={() => onNav('contact')}
          className="text-[11px] tracking-[0.22em] uppercase px-5 py-2.5 border border-cream/30 text-cream/80 hover:text-cream hover:border-cream/60 transition-all duration-250"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Book Consult
        </motion.button>
      </div>
    </motion.header>
  )
}
