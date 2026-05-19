import { useRef, useCallback, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import type { Project } from '../types'

export default function Rotation360({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false)
  const [snapMode, setSnapMode]   = useState(false)

  const dragStartX   = useRef(0)
  const dragStartRot = useRef(0)
  const lastX        = useRef(0)
  const lastTime     = useRef(0)
  const lastVel      = useRef(0)
  const dragging     = useRef(false)

  const rawRot  = useMotionValue(0)
  const rot     = useSpring(rawRot, { stiffness: 180, damping: 26, mass: 0.4 })
  const normRot = useTransform(rot, v => ((v % 360) + 360) % 360)
  const arcLen  = useTransform(normRot, v => v / 360)

  const snapNearest90 = useCallback((cur: number) => {
    const n = ((cur % 360) + 360) % 360
    return cur - n + Math.round(n / 90) * 90
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    dragging.current     = true
    dragStartX.current   = e.clientX
    dragStartRot.current = rawRot.get()
    lastX.current        = e.clientX
    lastTime.current     = Date.now()
    lastVel.current      = 0
  }, [rawRot])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    const dt = Math.max(1, Date.now() - lastTime.current)
    lastVel.current  = ((e.clientX - lastX.current) / dt) * 16
    lastX.current    = e.clientX
    lastTime.current = Date.now()
    rawRot.set(dragStartRot.current + (e.clientX - dragStartX.current) * 0.65)
  }, [rawRot])

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return
    dragging.current = false
    const v   = lastVel.current
    const cur = rawRot.get()
    if (snapMode) {
      animate(rawRot, snapNearest90(cur), { type: 'spring', stiffness: 220, damping: 32 })
    } else {
      animate(rawRot, cur + v * 10, { type: 'spring', velocity: v * 5, stiffness: 55, damping: 18 })
    }
  }, [rawRot, snapMode, snapNearest90])

  const reset = useCallback(() => {
    const cur  = rawRot.get()
    const norm = ((cur % 360) + 360) % 360
    animate(rawRot, cur - norm, { type: 'spring', stiffness: 280, damping: 32 })
  }, [rawRot])

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ perspective: '1200px' }} className="w-full aspect-[3/4]">
        <motion.div
          className="w-full h-full relative cursor-grab active:cursor-grabbing"
          style={{ rotateY: rot, transformStyle: 'preserve-3d' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          whileHover={{ scale: 1.01 }}
          transition={{ scale: { duration: 0.3 } }}
        >
          {/* Front */}
          <div className="absolute inset-0 overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
            <img src={project.img} alt={project.title} className="w-full h-full object-cover" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-walnut text-[10px] tracking-[0.28em] uppercase font-body">{project.tag}</span>
              <div className="font-display text-2xl text-cream mt-1.5 leading-tight">{project.title}</div>
              <div className="text-cream/50 text-[12px] font-body mt-1">{project.location} · {project.year}</div>
            </div>
            <motion.div
              className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-cream/70 text-[10px] tracking-widest uppercase font-body">Drag to rotate</span>
            </motion.div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-card border border-white/5 p-8 flex flex-col justify-center"
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
          >
            <span className="text-walnut text-[10px] tracking-[0.28em] uppercase font-body mb-4">{project.tag}</span>
            <h3 className="font-display text-cream font-light leading-tight" style={{ fontSize: 'clamp(28px,3vw,40px)' }}>{project.title}</h3>
            <p className="text-cream/50 text-[13px] font-body font-light mt-4 leading-relaxed">{project.description}</p>
            <div className="mt-5 flex items-center gap-3 text-cream/30 text-[11px] font-body">
              <span>{project.location}</span><span>·</span><span>{project.year}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <motion.div
        className="absolute bottom-4 right-4 flex items-center gap-2"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <svg className="w-[52px] h-[52px] -rotate-90" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <motion.circle
            cx="26" cy="26" r="24" fill="none"
            stroke="#DA4F37" strokeWidth="1.5" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 24}
            style={{ pathLength: arcLen }}
          />
        </svg>
        <motion.button onClick={reset}
          className="w-8 h-8 flex items-center justify-center border border-white/15 text-cream/50 hover:text-cream bg-black/40 backdrop-blur-sm rounded-sm text-base"
          whileHover={{ scale: 1.1, rotate: -30 }} whileTap={{ scale: 0.9 }}
        >↺</motion.button>
        <motion.button onClick={() => setSnapMode(s => !s)}
          className={`h-8 px-2.5 text-[9px] tracking-widest uppercase border backdrop-blur-sm rounded-sm font-body ${snapMode ? 'border-walnut/60 text-walnut bg-walnut/10' : 'border-white/15 text-cream/40 bg-black/40'}`}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        >{snapMode ? 'Snap' : 'Free'}</motion.button>
      </motion.div>
    </div>
  )
}
