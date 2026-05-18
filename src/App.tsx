import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import type { Page } from './types'

const pageMap = { home: Home, projects: Projects, contact: Contact } as const

export default function App() {
  const [page, setPage] = useState<Page>('home')

  const navigate = useCallback((target: Page) => {
    if (target === page) return
    setPage(target)
    window.scrollTo(0, 0)
  }, [page])

  const PageComponent = pageMap[page]

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#F5F1ED' }}>
      <Navbar page={page} onNav={navigate} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PageComponent onNav={navigate} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
