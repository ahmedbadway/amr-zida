import { useRef, useCallback, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
  animate,
} from 'framer-motion'
import type { Project } from '../types'

interface Rotation360Props {
  project: Project
}

const CIRCUMFERENCE = 2 * Math.PI * 24

export default function Rotation360({ project }: Rotation360Props) {
  const [snapMode, setSnapMode]       = useState(false)
  const [isHovered, setIsHovered]     = useState(false)
  const [displayAngle, setDisplayAngle] = useState(0)

  const dragStartX   = useRef(0)
  const dragStartRot = useRef(0)
  const lastX        = useRef(0)
  const lastTime     = useRef(0)
  const lastVelocity = useRef(0)
  const dragging     = useRef(false)

  // Raw rotation (unbounded degrees)
  const rawRot = useMotionValue(0)
  // Physics-smoothed follow
  const rot = useSpring(rawRot, { stiffness: 180, damping: 26, mass: 0.4 })
  // 0–360 display
  const normRot = useTransform(rot, v => ((v % 360) + 360) % 360)
  // SVG arc
  const pathLength = useTransform(normRot, v => v / 360)

  useMotionValueEvent(normRot, 'change', v => setDisplayAngle(Math.round(v)))

  const snapToNearest90 = useCallback((current: number) => {
    const n = ((current % 360) + 360) % 360
    const nearest = Math.round(n / 90) * 90
    return current - n + nearest
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    dragging.current   = true
    dragStartX.current = e.clientX
    dragStartRot.current = rawRot.get()
    lastX.current      = e.clientX
    lastTime.current   = Date.now()
    lastVelocity.current = 0
  }, [rawRot])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    const now = Date.now()
    const dt  = Math.max(1, now - lastTime.current)
    const dx  = e.clientX - lastX.current
    lastVelocity.current = (dx / dt) * 16
    lastX.current  = e.clientX
    lastTime.current = now
    rawRot.set(dragStartRot.current + (e.clientX - dragStartX.current) * 0.65)
  }, [rawRot])

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return
    dragging.current = false
    const v       = lastVelocity.current
    const current = rawRot.get()
    if (snapMode) {
      animate(rawRot, snapToNearest90(current), {
        type: 'spring', stiffness: 220, damping: 32,
      })
    } else {
      animate(rawRot, current + v * 10, {
        type: 'spring',
        velocity: v * 5,
        stiffness: 55,
        damping: 18,
      })
    }
  }, [rawRot, snapMode, snapToNearest90])

  const reset = useCallback(() => {
    const current    = rawRot.get()
    const normalized = ((current % 360) + 360) % 360
    animate(rawRot, current - normalized, {
      type: 'spring', stiffness: 280, damping: 32,
    })
  }, [rawRot])

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D viewport */}
      <div className="perspective-1200 w-full aspect-[3/4]">
        <motion.div
          className="w-full h-full relative cursor-grab active:cursor-grabbing preserve-3d"
          style={{ rotateY: rot }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          whileHover={{ scale: 1.01 }}
          transition={{ scale: { duration: 0.3 } }}
        >
          {/* ── Front face ── */}
          <div className="absolute inset-0 backface-hidden overflow-hidden">
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-walnut text-[10px] tracking-[0.28em] uppercase font-body">
                {project.tag}
              </span>
              <div className="font-display text-2xl text-cream mt-1.5 leading-tight">
                {project.title}
              </div>
              <div className="text-cream/50 text-[12px] font-body mt-1">
                {project.location} · {project.year}
              </div>
            </div>
            {/* Drag hint */}
            <motion.div
              className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-cream/70 text-[10px] tracking-widest uppercase font-body">
                Drag to rotate
              </span>
            </motion.div>
          </div>

          {/* ── Back face ── */}
          <div
            className="absolute inset-0 backface-hidden bg-card border border-white/5 p-8 flex flex-col justify-center"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <span className="text-walnut text-[10px] tracking-[0.28em] uppercase font-body mb-4">
              {project.tag}
            </span>
            <h3 className="font-display text-[clamp(28px,3vw,40px)] text-cream font-light leading-tight">
              {project.title}
            </h3>
            <p className="text-cream/50 text-[13px] font-body font-light mt-4 leading-relaxed">
              {project.description}
            </p>
            <div className="mt-5 flex items-center gap-3 text-cream/30 text-[11px] font-body">
              <span>{project.location}</span>
              <span>·</span>
              <span>{project.year}</span>
            </div>
            <motion.button
              className="mt-8 self-start text-[10px] tracking-[0.22em] uppercase border border-white/15 px-5 py-2.5 text-cream/60 hover:text-cream hover:border-white/40 transition-all duration-250"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
            >
              View Details →
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ── Controls overlay ── */}
      <motion.div
        className="absolute bottom-4 right-4 flex items-center gap-2"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
        transition={{ duration: 0.25 }}
      >
        {/* Rotation arc progress */}
        <div className="relative w-[52px] h-[52px]">
          <svg
            className="w-full h-full -rotate-90"
            viewBox="0 0 52 52"
          >
            <circle cx="26" cy="26" r="24" fill="none"
              stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <motion.circle cx="26" cy="26" r="24" fill="none"
              stroke="#8B7355" strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ pathLength }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-cream/60 text-[9px] font-body tabular-nums">
              {displayAngle}°
            </span>
          </div>
        </div>

        {/* Reset */}
        <motion.button
          onClick={reset}
          className="w-8 h-8 flex items-center justify-center border border-white/15 text-cream/50 hover:text-cream hover:border-white/30 transition-all text-base bg-black/40 backdrop-blur-sm rounded-sm"
          whileHover={{ scale: 1.1, rotate: -30 }}
          whileTap={{ scale: 0.9 }}
          title="Reset rotation"
        >
          ↺
        </motion.button>

        {/* Snap toggle */}
        <motion.button
          onClick={() => setSnapMode(s => !s)}
          className={`h-8 px-2.5 text-[9px] tracking-widest uppercase border transition-all backdrop-blur-sm rounded-sm font-body ${
            snapMode
              ? 'border-walnut/60 text-walnut bg-walnut/10'
              : 'border-white/15 text-cream/40 hover:text-cream/70 hover:border-white/30 bg-black/40'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={snapMode ? 'Snap to 90°' : 'Free rotation'}
        >
          {snapMode ? 'Snap' : 'Free'}
        </motion.button>
      </motion.div>
    </div>
  )
}
