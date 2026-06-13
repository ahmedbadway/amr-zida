import { motion } from 'framer-motion'
import LogoMark from './LogoMark'
import type { Page } from '../types'

type Props = { onNav: (p: Page) => void }

const QUICK_LINKS: { id: Page; label: string }[] = [
  { id: 'home',     label: 'Home'     },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact'  },
]

const SERVICES = ['Facade Design', 'Interior Design', 'Decoration', 'Full Service']

const CONTACT = [
  { label: 'Email', value: 'hello@atelieramr.com' },
  { label: 'Phone', value: '01026000056' },
  { label: 'Hours', value: 'Mon – Fri · 09:30 – 18:00' },
]

export default function Footer({ onNav }: Props) {
  return (
    <footer className="bg-charcoal border-t border-white/6">
      {/* Accent rule */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-walnut/70 to-transparent" />

      <div className="max-w-6xl mx-auto px-8 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">

          {/* ── Brand block ── */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-7">
              <LogoMark className="h-8 w-8 text-cream" />
              <div className="leading-tight">
                <div className="font-display text-[15px] font-semibold tracking-[0.22em] uppercase text-cream">
                  Amr Ziada
                </div>
                <div className="font-display text-[10px] font-medium tracking-[0.32em] uppercase text-cream/55 mt-1">
                  Interiors<span className="align-super text-[7px] ml-0.5">™</span>
                </div>
              </div>
            </div>

            <p className="font-body text-[14px] font-light text-cream/55 leading-[1.75] max-w-sm">
              A small, deliberate studio designing interiors that feel
              both modern and quietly inevitable. Based in Cairo,
              working internationally.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 text-walnut">
              <span className="h-px w-8 bg-walnut/80" />
              <span className="font-body text-[10px] tracking-[0.32em] uppercase font-semibold">
                Luxurious · Modern · Unique
              </span>
            </div>
          </motion.div>

          {/* ── Contact ── */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-body text-[9px] tracking-[0.32em] uppercase text-walnut font-semibold block mb-6">
              Studio
            </span>
            <ul className="space-y-4">
              {CONTACT.map(c => (
                <li key={c.label}>
                  <div className="font-body text-[10px] tracking-[0.28em] uppercase text-cream/55 mb-1">
                    {c.label}
                  </div>
                  <div className="font-body text-[13px] font-light text-cream/80">
                    {c.value}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Navigation + services ── */}
          <motion.div
            className="md:col-span-4 grid grid-cols-2 gap-10"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <span className="font-body text-[9px] tracking-[0.32em] uppercase text-walnut font-semibold block mb-6">
                Site
              </span>
              <ul className="space-y-3">
                {QUICK_LINKS.map(l => (
                  <li key={l.id}>
                    <button
                      onClick={() => onNav(l.id)}
                      className="font-body text-[13px] font-light text-cream/75 hover:text-walnut transition-colors duration-200"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-body text-[9px] tracking-[0.32em] uppercase text-walnut font-semibold block mb-6">
                Services
              </span>
              <ul className="space-y-3">
                {SERVICES.map(s => (
                  <li
                    key={s}
                    className="font-body text-[13px] font-light text-cream/75"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-16 pt-8 border-t border-white/6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="font-body text-[11px] tracking-[0.18em] uppercase text-cream/50">
            © {new Date().getFullYear()} Amr Ziada Interiors. All rights reserved.
          </div>
          <div className="flex items-center gap-3 font-body text-[10px] tracking-[0.28em] uppercase text-cream/35">
            <span>Designed in Cairo</span>
            <span className="h-px w-6 bg-walnut/60" />
            <span className="text-walnut/80">AZ™</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
