import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface VideoItem {
  id: number
  title: string
  tag: string
  year: string
  location: string
  description: string
  src: string
  poster?: string
}

export default function VideoCard({ video }: { video: VideoItem }) {
  const videoRef  = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [hovered, setHovered]   = useState(false)

  const toggle = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else          { v.pause(); setPlaying(false) }
  }, [])

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current
    if (!v || !v.duration) return
    setProgress(v.currentTime / v.duration)
  }, [])

  const onEnded = useCallback(() => setPlaying(false), [])

  const seek = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const v = videoRef.current
    if (!v || !v.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    v.currentTime = ratio * v.duration
    setProgress(ratio)
  }, [])

  return (
    <motion.div
      className="relative select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
    >
      {/* Video container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-card">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          className="w-full h-full object-cover"
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          playsInline
          preload="metadata"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

        {/* Big play/pause hit area */}
        <button
          onClick={toggle}
          className="absolute inset-0 w-full h-full flex items-center justify-center focus:outline-none"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          <AnimatePresence mode="wait">
            {!playing && (
              <motion.div
                key="play"
                className="w-14 h-14 rounded-full border border-cream/40 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: hovered ? 1 : 0.6, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-cream text-xl ml-0.5">▶</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Project info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
          <span className="text-walnut text-[10px] tracking-[0.28em] uppercase font-body">
            {video.tag}
          </span>
          <div className="font-display text-2xl text-cream mt-1.5 leading-tight">
            {video.title}
          </div>
          <div className="text-cream/50 text-[12px] font-body mt-1">
            {video.location} · {video.year}
          </div>
        </div>

        {/* Pause indicator while playing */}
        <AnimatePresence>
          {playing && hovered && (
            <motion.button
              onClick={toggle}
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-label="Pause"
            >
              <span className="text-cream text-[11px] tracking-widest">❚❚</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar + scrubber */}
      <div
        className="relative h-[3px] bg-white/10 cursor-pointer group/bar"
        onPointerDown={seek}
      >
        <motion.div
          className="h-full bg-walnut origin-left"
          style={{ scaleX: progress }}
        />
        {/* Hover expand */}
        <motion.div
          className="absolute inset-0 bg-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Description panel */}
      <motion.div
        className="bg-card border border-white/[0.06] px-6 py-5"
        style={{ borderTop: 'none' }}
      >
        <p className="text-cream/50 text-[13px] font-body font-light leading-relaxed">
          {video.description}
        </p>
      </motion.div>
    </motion.div>
  )
}
