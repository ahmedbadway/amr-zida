import { motion } from 'framer-motion'
import type { PageProps } from '../types'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
})

const stats = [
  { n: '15+', l: 'Years of Practice' },
  { n: '180', l: 'Completed Projects' },
  { n: '65',  l: 'Design Awards' },
  { n: '3',   l: 'Countries' },
]

const services = [
  { num: '01', title: 'Facade Design',   desc: 'Architecture-led exteriors with material honesty — from massing to final elevation.' },
  { num: '02', title: 'Interior Design', desc: 'Full-service interiors from concept to install. Every millimetre considered.' },
  { num: '03', title: 'Decoration',      desc: 'Curated styling, art curation, and the small objects that complete a room.' },
]

const featured = [
  { src: 'images/Project-2.jpg', title: 'Masr El Gedid', tag: 'Hospitality', loc: 'Cairo' },
  { src: 'images/Project-3.jpg', title: '6 of October',  tag: 'Commercial',  loc: 'Cairo' },
  { src: 'images/Project-4.jpg', title: 'Bel Air',       tag: 'Residential', loc: 'Cairo' },
]

export default function Home({ onNav }: PageProps) {
  return (
    <div>
      {/* Hero 1 — video */}
      <section className="relative h-screen overflow-hidden flex items-end">
        <video
          src="videos/Home-1.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="images/Home-2.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-12 pb-20">
          <motion.span className="text-walnut text-[10px] tracking-[0.32em] uppercase font-body font-bold block mb-5" {...fadeUp(0.1)}>
            Interior Design Studio
          </motion.span>
          <motion.h1
            className="font-display font-light text-cream leading-[1.0]"
            style={{ fontSize: 'clamp(56px, 8vw, 112px)' }}
            {...fadeUp(0.2)}
          >
            Interiors<br />Designed<br />With Intent.
          </motion.h1>
          <motion.p className="font-body text-[15px] font-light text-cream/65 leading-[1.75] max-w-sm mt-7" {...fadeUp(0.35)}>
            A small, deliberate studio working closely with clients to create spaces that feel both modern and quietly inevitable.
          </motion.p>
          <motion.div className="flex gap-3 mt-10" {...fadeUp(0.45)}>
            <button
              onClick={() => onNav('projects')}
              className="bg-cream text-charcoal text-[11px] tracking-[0.25em] uppercase px-10 py-4 font-body hover:bg-walnut hover:text-cream transition-colors duration-200"
            >View Our Work</button>
            <button
              onClick={() => onNav('contact')}
              className="border border-cream/35 text-cream text-[11px] tracking-[0.25em] uppercase px-10 py-4 font-body hover:bg-white/08 transition-colors duration-200"
            >Start a Project</button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.l} {...fadeUp(i * 0.08)}>
              <div className="font-display text-[52px] font-light text-cream leading-none">{s.n}</div>
              <div className="font-body text-[10px] tracking-[0.22em] uppercase text-cream/40 mt-2">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hero 2 — image */}
      <section className="relative h-screen overflow-hidden flex items-center">
        <img src="images/Home-2.jpg" alt="Studio" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/5" />
        <div className="relative z-10 max-w-6xl w-full mx-auto px-8 md:px-12">
          <motion.div
            className="max-w-[520px]"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          >
            <span className="text-walnut text-[10px] tracking-[0.32em] uppercase font-body font-bold block mb-5">About the Studio</span>
            <h2 className="font-display font-light text-cream leading-[1.1]" style={{ fontSize: 'clamp(36px, 3.5vw, 56px)' }}>
              Spaces that feel quietly inevitable.
            </h2>
            <p className="font-body text-[15px] font-light text-cream/65 leading-[1.8] mt-6">
              Amr is a deliberate studio. We work closely with a handful of clients each year to design interiors that prioritise warmth, longevity, and the texture of real materials.
            </p>
            <button
              onClick={() => onNav('contact')}
              className="mt-9 border border-cream/35 text-cream text-[11px] tracking-[0.25em] uppercase px-9 py-3.5 font-body hover:bg-white/8 transition-colors duration-200"
            >Our Philosophy</button>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-24">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-walnut text-[10px] tracking-[0.32em] uppercase font-body font-bold block mb-4">What We Do</span>
              <h2 className="font-display font-light text-cream" style={{ fontSize: 'clamp(34px, 3vw, 48px)' }}>A complete design service.</h2>
            </div>
          </div>
          <div className="flex flex-col">
            {services.map((s, i) => (
              <motion.div
                key={s.num}
                className="group border-t border-white/[0.06] last:border-b"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <div className="grid grid-cols-[60px_1fr_2fr] items-center gap-8 py-8">
                  <span className="font-display text-[26px] text-walnut/30 group-hover:text-walnut transition-colors duration-300">{s.num}</span>
                  <h3 className="font-display font-light text-[24px] text-cream">{s.title}</h3>
                  <p className="font-body text-[13px] font-light text-cream/50 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="bg-obsidian">
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-walnut text-[10px] tracking-[0.32em] uppercase font-body font-bold block mb-4">Selected Work</span>
              <h2 className="font-display font-light text-cream" style={{ fontSize: 'clamp(34px, 3vw, 48px)' }}>Recent projects.</h2>
            </div>
            <button
              onClick={() => onNav('projects')}
              className="hidden md:block border border-white/15 text-cream/60 text-[10px] tracking-[0.22em] uppercase px-6 py-2.5 font-body hover:text-cream hover:border-white/30 transition-all duration-200"
            >All Projects</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map((p, i) => (
              <motion.div
                key={i}
                className="group relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: '3/4' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                onClick={() => onNav('projects')}
              >
                <img src={p.src} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-walnut text-[10px] tracking-[0.24em] uppercase font-body block mb-2">{p.tag}</span>
                  <div className="font-display text-xl text-cream leading-tight">{p.title}</div>
                  <div className="font-body text-[12px] text-cream/50 mt-1 font-light">{p.loc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero 3 — CTA video */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        <video
          src="videos/Home-3.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="images/Home-2.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/72" />
        <motion.div
          className="relative z-10 text-center px-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        >
          <span className="text-walnut text-[10px] tracking-[0.32em] uppercase font-body font-bold block mb-5">Let's Begin</span>
          <h2 className="font-display font-light text-cream leading-[1.1]" style={{ fontSize: 'clamp(36px, 4.5vw, 68px)' }}>
            Imagine the space.<br />We'll build the rest.
          </h2>
          <p className="font-body text-[14px] font-light text-cream/55 mt-5 leading-relaxed">
            We accept a limited number of new projects each season.
          </p>
          <button
            onClick={() => onNav('contact')}
            className="mt-10 border border-cream/35 text-cream text-[11px] tracking-[0.25em] uppercase px-12 py-4 font-body hover:bg-white/8 transition-colors duration-200"
          >Start the Conversation</button>
        </motion.div>
      </section>
    </div>
  )
}
