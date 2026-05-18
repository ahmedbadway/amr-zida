import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const stagger = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const slideUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const INITIAL_FORM = { name: '', email: '', phone: '', service: 'Interior Design', message: '' }
type FormState = typeof INITIAL_FORM
type Errors = Partial<Record<keyof FormState, string>>

function validate(form: FormState): Errors {
  const e: Errors = {}
  if (!form.name.trim()) e.name = 'Please tell us your name.'
  if (!form.email.trim()) e.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'That email looks off.'
  if (form.message.trim().length < 10) e.message = 'A few more words, please.'
  return e
}

export default function Contact() {
  const [form, setForm]     = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    setErrors(er => ({ ...er, [k]: undefined }))
  }

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate(form)
    if (Object.keys(e).length) { setErrors(e); return }
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setForm(INITIAL_FORM)
      setTimeout(() => setStatus('idle'), 5000)
    }, 1200)
  }

  const info = [
    { label: 'Email',  lines: ['hello@atelieramr.com']           },
    { label: 'Phone',  lines: ['01026000056']                     },
    { label: 'Hours',  lines: ['Monday — Friday', '09:30 — 18:00'] },
  ]

  return (
    <div>
      {/* ── Header ── */}
      <section
        className="relative h-screen flex items-end"
        style={{
          backgroundImage: 'url(/images/project6.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/38 to-black/08" />
        <motion.div
          className="relative z-10 max-w-6xl w-full mx-auto px-8 md:px-12 pb-18"
          style={{ paddingBottom: '4.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-walnut text-[10px] tracking-[0.32em] uppercase font-body font-bold block mb-4">
            Contact
          </span>
          <h1 className="font-display font-light text-cream leading-[1.05]"
            style={{ fontSize: 'clamp(48px, 6vw, 84px)' }}>
            Tell us about<br />your space.
          </h1>
          <p className="font-body text-[15px] font-light text-cream/60 max-w-md mt-5 leading-relaxed">
            Send us a note. We respond personally within two working days.
          </p>
        </motion.div>
      </section>

      {/* ── Form + Info ── */}
      <section className="bg-obsidian border-t border-white/5">
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 items-start">

          {/* Form */}
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="success"
                className="flex flex-col items-start gap-4 py-16"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-12 h-12 rounded-full border border-walnut/40 flex items-center justify-center mb-2">
                  <span className="text-walnut text-lg">✓</span>
                </div>
                <h3 className="font-display font-light text-cream text-[36px]">
                  Thank you.
                </h3>
                <p className="font-body text-[14px] font-light text-cream/55 leading-relaxed max-w-sm">
                  We've received your message and will be in touch personally within two working days.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                noValidate
                variants={stagger}
                initial="initial"
                animate="animate"
                className="border border-white/06 bg-white/[0.02] p-10 md:p-14"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <FormField label="Name" id="name" error={errors.name}>
                    <TextInput id="name" type="text" value={form.name}
                      onChange={update('name')} hasError={!!errors.name} />
                  </FormField>
                  <FormField label="Email" id="email" error={errors.email}>
                    <TextInput id="email" type="email" value={form.email}
                      onChange={update('email')} hasError={!!errors.email} />
                  </FormField>
                  <FormField label="Phone (optional)" id="phone">
                    <TextInput id="phone" type="tel" value={form.phone}
                      onChange={update('phone')} hasError={false} />
                  </FormField>
                  <FormField label="Service" id="service">
                    <select id="service" value={form.service} onChange={update('service')}
                      className="w-full bg-transparent border-b border-white/15 pb-2 pt-2 font-body text-[14px] text-cream outline-none cursor-pointer focus:border-walnut transition-colors duration-200"
                      style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                    >
                      {['Facade Design', 'Interior Design', 'Decoration', 'Full Service'].map(o => (
                        <option key={o} className="bg-obsidian">{o}</option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <FormField label="Project Details" id="message" error={errors.message}>
                  <textarea
                    id="message" rows={5} value={form.message} onChange={update('message')}
                    className="w-full bg-transparent border-b pb-2 pt-2 font-body text-[14px] text-cream outline-none resize-none leading-relaxed transition-colors duration-200"
                    style={{
                      borderColor: errors.message ? '#b91c1c' : 'rgba(255,255,255,0.15)',
                      borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                    }}
                  />
                </FormField>

                <motion.div className="flex items-center gap-6 mt-10" variants={slideUp}>
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    className="font-body text-[11px] tracking-[0.25em] uppercase px-10 py-4 bg-walnut text-cream disabled:opacity-50 transition-opacity"
                    whileHover={{ backgroundColor: '#a08060' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
                  </motion.button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Info panel */}
          <motion.div
            className="pt-2"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {info.map((block, i) => (
              <div key={block.label} className={i > 0 ? 'mt-8 pt-8 border-t border-white/06' : ''} style={{ borderColor: i > 0 ? 'rgba(255,255,255,0.06)' : undefined }}>
                <span className="text-walnut text-[9px] tracking-[0.32em] uppercase font-body font-bold block mb-3">
                  {block.label}
                </span>
                {block.lines.map(line => (
                  <p key={line} className="font-body text-[14px] font-light text-cream/60 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function FormField({ label, id, error, children }: {
  label: string; id: string; error?: string; children: React.ReactNode
}) {
  return (
    <motion.label htmlFor={id} className="block" variants={slideUp}>
      <span className="font-body text-[9px] tracking-[0.28em] uppercase text-cream/35 block mb-2">
        {label}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            className="block mt-1.5 font-body text-[11px] text-red-400"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.label>
  )
}

function TextInput({ id, type, value, onChange, hasError }: {
  id: string; type: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; hasError: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      id={id} type={type} value={value} onChange={onChange}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      className="w-full bg-transparent pb-2 pt-2 font-body text-[14px] text-cream outline-none transition-colors duration-200"
      style={{
        borderBottom: `1px solid ${hasError ? '#b91c1c' : focused ? '#8B7355' : 'rgba(255,255,255,0.15)'}`,
        borderTop: 'none', borderLeft: 'none', borderRight: 'none',
      }}
    />
  )
}
