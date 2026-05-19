import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Rotation360 from '../components/Rotation360'
import VideoCard, { type VideoItem } from '../components/VideoCard'
import type { PageProps, Project } from '../types'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const ALL_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Tagmo3 5',
    tag: 'Residential',
    year: '2025',
    location: 'Cairo',
    description: 'A considered family home where warm timber, handmade ceramics and abundant natural light create a sense of grounded calm.',
    img: 'images/Project-1.jpg',
  },
  {
    id: 2,
    title: 'Masr El Gedid',
    tag: 'Hospitality',
    year: '2024',
    location: 'Cairo',
    description: 'Boutique hospitality project balancing coastal lightness with rich material textures — raw linen, aged brass, and rammed earth.',
    img: 'images/Project-2.jpg',
  },
  {
    id: 3,
    title: '6 of October',
    tag: 'Commercial',
    year: '2024',
    location: 'Cairo',
    description: 'Studio and showroom space for a fashion brand. A restrained palette — white plaster, blackened steel, pale oak — lets the work breathe.',
    img: 'images/Project-3.jpg',
  },
  {
    id: 4,
    title: 'Bel Air Residence',
    tag: 'Residential',
    year: '2023',
    location: 'Cairo',
    description: 'Private villa rethought around a central courtyard. Traditional proportions, contemporary restraint.',
    img: 'images/Project-4.jpg',
  },
  {
    id: 5,
    title: 'Coastal Retreat',
    tag: 'Residential',
    year: '2023',
    location: 'Cairo',
    description: 'Clifftop house where every room frames the Atlantic. Palette drawn entirely from the landscape — salt, stone, sea grass.',
    img: 'images/Project-5.jpg',
  },
  {
    id: 6,
    title: 'The Garden Suite',
    tag: 'Hospitality',
    year: '2022',
    location: 'Cairo',
    description: 'A single guest suite above a historic garden. Jewel-toned fabrics and antique stone contrast beautifully with the old city outside.',
    img: 'images/Project-6.jpg',
  },
  {
    id: 7,
    title: 'Studio Atelier',
    tag: 'Commercial',
    year: '2022',
    location: 'Cairo',
    description: 'A working studio reimagined as a quiet retreat — raw concrete softened by woven textiles, reclaimed wood, and carefully considered light.',
    img: 'images/Project-7.jpg',
  },
]

// Add video files to public/videos/ and list them here.
// Example entry (uncomment and update filenames when you add videos):
//
// { id: 1, title: 'Project Walkthrough', tag: 'Residential', year: '2025',
//   location: 'Cairo', description: '...', src: '/videos/walkthrough.mp4',
//   poster: 'images/project1.jpg' },
const ALL_VIDEOS: VideoItem[] = []

const FILTERS = ['All', 'Residential', 'Hospitality', 'Commercial'] as const
type Filter = typeof FILTERS[number]

export default function Projects({ onNav }: PageProps) {
  const [active, setActive] = useState<Filter>('All')

  const filtered = active === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.tag === active)

  const filteredVideos = active === 'All'
    ? ALL_VIDEOS
    : ALL_VIDEOS.filter(v => v.tag === active)

  return (
    <div>
      {/* ── Header ── */}
      <section className="relative h-screen overflow-hidden flex flex-col justify-end">
        <video
          src="videos/Projects-Hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="images/Project-5.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-black/10" />

        <motion.div
          className="relative z-10 max-w-6xl w-full mx-auto px-8 md:px-12 pb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <span className="text-walnut text-[10px] tracking-[0.32em] uppercase font-body font-bold block mb-4">
            Our Work
          </span>
          <h1 className="font-display font-light text-cream leading-[1.05]"
            style={{ fontSize: 'clamp(52px, 6vw, 88px)' }}>
            A selection of<br />recent work.
          </h1>
          <p className="font-body text-[14px] font-light text-cream/55 max-w-md mt-5 leading-relaxed mb-9">
            Seven projects shaped by a shared approach — warm materials, generous light, quiet order.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <motion.button
                key={f}
                onClick={() => setActive(f)}
                className={`text-[10px] tracking-[0.22em] uppercase px-5 py-2 font-body border transition-all duration-200 ${
                  active === f
                    ? 'bg-cream text-charcoal border-cream'
                    : 'border-white/25 text-cream/60 hover:text-cream hover:border-white/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Photo Grid ── */}
      <section className="bg-obsidian py-16 px-8 md:px-12">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                >
                  <Rotation360 project={project} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-24 text-center font-body text-[13px] text-cream/30 tracking-widest uppercase">
              No projects found.
            </div>
          )}

          <motion.p
            className="text-center font-body text-[10px] tracking-[0.25em] uppercase text-cream/25 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Hover a card · drag to rotate · see project details on the back
          </motion.p>
        </div>
      </section>

      {/* ── Video Background Section ── */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center border-t border-white/5">
        <video
          src="videos/Projects-Mid.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="images/Project-2.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/40" />

        <motion.div
          className="relative z-10 text-center px-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.span
            className="text-walnut text-[10px] tracking-[0.32em] uppercase font-body font-bold block mb-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            Film
          </motion.span>

          <motion.h2
            className="font-display font-light text-cream leading-[1.1]"
            style={{ fontSize: 'clamp(44px, 5vw, 84px)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          >
            Projects in motion.
          </motion.h2>

          <motion.p
            className="font-body text-[15px] font-light text-cream/65 leading-relaxed mt-6 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          >
            Walkthroughs, atmospheres and process films from selected projects —
            where light, material and proportion come together over time.
          </motion.p>

          {filteredVideos.length > 0 && (
            <motion.div
              className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            >
              {filteredVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Bottom scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.div
            className="w-px h-12 bg-cream/30 origin-top"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-white/5 py-36 px-8 text-center">
        <img
          src="images/Projects-End.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="text-walnut text-[10px] tracking-[0.32em] uppercase font-body font-bold block mb-4">
              Work with us
            </span>
            <h2 className="font-display font-light text-cream"
              style={{ fontSize: 'clamp(32px, 3vw, 46px)' }}>
              Your project, next.
            </h2>
            <motion.button
              onClick={() => onNav('contact')}
              className="mt-10 bg-walnut text-cream text-[11px] tracking-[0.25em] uppercase px-12 py-4 font-body"
              whileHover={{ backgroundColor: '#a08060' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              Start the Conversation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
