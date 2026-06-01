import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Services',  href: '/#services',  anchor: true },
  { label: 'Projects',  href: '/projects',    anchor: false },
  { label: 'Contact',   href: '/#contact',    anchor: true },
]

function MagButton({ href, children }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2 })
  }
  const onLeave = () => setPos({ x: 0, y: 0 })

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x * 0.25, y: pos.y * 0.25 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{
        display: 'inline-block', padding: '10px 24px', borderRadius: 8,
        background: 'linear-gradient(135deg, #7c6bff 0%, #ff6b9d 100%)',
        fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer',
        boxShadow: '0 0 20px rgba(124,107,255,0.35)',
      }}
    >
      {children}
    </motion.a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? 'rgba(5,5,8,0.80)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'background 0.4s, backdrop-filter 0.4s, border 0.4s',
      }}
    >
      <div style={{
        maxWidth: 1160, margin: '0 auto', padding: '0 28px',
        height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link to="/" style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22,
          letterSpacing: '-0.03em', color: '#fff',
        }}>
          CPT<span style={{ color: '#7c6bff' }}>.</span>
        </Link>

        <nav style={{ display: 'flex', gap: 38, alignItems: 'center' }}
          className="desktop-nav">
          {links.map(l => (
            <NavLink key={l.label} href={l.href} anchor={l.anchor}>{l.label}</NavLink>
          ))}
          <MagButton href="/#contact">Get Started</MagButton>
        </nav>

        <button
          onClick={() => setOpen(p => !p)}
          className="mobile-menu-btn"
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              overflow: 'hidden',
              background: 'rgba(5,5,8,0.97)',
              backdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ padding: '12px 28px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {links.map((l, i) => (
                <motion.div key={l.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  {l.anchor
                    ? <a href={l.href} onClick={() => setOpen(false)} style={{ display: 'block', padding: '14px 0', fontSize: 18, fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)', fontFamily: 'Syne, sans-serif', color: '#e8e8f0' }}>{l.label}</a>
                    : <Link to={l.href} onClick={() => setOpen(false)} style={{ display: 'block', padding: '14px 0', fontSize: 18, fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.05)', fontFamily: 'Syne, sans-serif', color: '#e8e8f0' }}>{l.label}</Link>
                  }
                </motion.div>
              ))}
              <Link to="/#contact" onClick={() => setOpen(false)} style={{
                marginTop: 16, display: 'block', padding: '14px 0', textAlign: 'center',
                borderRadius: 8, background: 'linear-gradient(135deg, #7c6bff, #ff6b9d)',
                fontSize: 16, fontWeight: 700, color: '#fff',
              }}>
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
      `}</style>
    </motion.header>
  )
}

function NavLink({ href, anchor, children }) {
  const [hov, setHov] = useState(false)
  const location = useLocation()
  const isActive = !anchor && location.pathname === href

  const style = {
    fontSize: 14, fontWeight: 500,
    color: isActive ? '#fff' : hov ? '#fff' : '#8888a0',
    transition: 'color 0.2s',
    position: 'relative',
  }
  const underline = (
    <motion.span
      animate={{ scaleX: hov || isActive ? 1 : 0 }}
      style={{
        position: 'absolute', bottom: -2, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, #7c6bff, #ff6b9d)',
        transformOrigin: 'left',
      }}
    />
  )

  return anchor
    ? (
      <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={style}>
        {children}{underline}
      </a>
    ) : (
      <Link to={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={style}>
        {children}{underline}
      </Link>
    )
}
