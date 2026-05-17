import { useState, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import type { Page } from './types'

const pageMap = { home: Home, projects: Projects, contact: Contact } as const

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -20 },
}

const pageTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const mainRef = useRef<HTMLDivElement>(null)

  const navigate = useCallback((target: Page) => {
    if (target === page) return
    setPage(target)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 0)
  }, [page])

  const PageComponent = pageMap[page]

  return (
    <div className="min-h-screen bg-obsidian text-cream font-body antialiased">
      <Navbar page={page} onNav={navigate} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          ref={mainRef}
          key={page}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <PageComponent onNav={navigate} />
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
