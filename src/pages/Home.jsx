import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Code2, Layers, Zap, Globe, BarChart3, Shield } from 'lucide-react'

// ── Rotating headline words ────────────────────────────────────────────────
const WORDS = ['Ship Faster', 'Scale Smarter', 'Build Better', 'Move Forward']

function RotatingWord() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % WORDS.length), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    <span style={{ display: 'inline-block', position: 'relative' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 36, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -36, opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="grad-text"
          style={{ display: 'inline-block' }}
        >
          {WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ── Floating background orb ────────────────────────────────────────────────
function Orb({ x, y, size, color, delay }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0], opacity: [0.5, 0.75, 0.5] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        position: 'absolute', left: x, top: y,
        width: size, height: size, borderRadius: '50%',
        background: color, filter: 'blur(90px)', pointerEvents: 'none',
      }}
    />
  )
}

// ── Services ──────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: Code2,    title: 'Custom Software',   desc: 'Tailor-made web and desktop apps built to your exact workflow.' },
  { icon: Globe,    title: 'Web Platforms',      desc: 'Scalable SaaS products and client portals with modern UX.' },
  { icon: Layers,   title: 'System Integration', desc: 'Connecting your tools, APIs, and data pipelines seamlessly.' },
  { icon: Zap,      title: 'Automation',         desc: 'Eliminate repetitive work with smart process automation.' },
  { icon: BarChart3,'title': 'Data & Analytics', desc: 'Dashboards and reporting tools that surface actionable insight.' },
  { icon: Shield,   title: 'Security & QA',      desc: 'Rigorous testing, audits, and compliance-ready architecture.' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function ServiceCard({ item }) {
  const [hov, setHov] = useState(false)
  const Icon = item.icon
  return (
    <motion.div
      variants={fadeUp}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -5 }}
      style={{
        background: hov ? 'rgba(17,17,28,0.9)' : 'rgba(13,13,22,0.5)',
        border: `1px solid ${hov ? 'rgba(124,107,255,0.3)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 14, padding: '28px 24px',
        transition: 'background 0.3s, border 0.3s',
        backdropFilter: 'blur(10px)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 20% 20%, rgba(124,107,255,0.08), transparent 60%)',
        }}
      />
      <div style={{
        width: 40, height: 40, borderRadius: 10, marginBottom: 16,
        background: 'rgba(124,107,255,0.12)', border: '1px solid rgba(124,107,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} color="#a89aff" />
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#e8e8f0', fontFamily: 'Syne, sans-serif', marginBottom: 8 }}>
        {item.title}
      </div>
      <div style={{ fontSize: 13, color: '#6b6b88', lineHeight: 1.65 }}>
        {item.desc}
      </div>
    </motion.div>
  )
}

// ── Home page ─────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{
        minHeight: '92vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden', paddingTop: 72,
      }}>
        <Orb x="5%"  y="10%" size={480} color="rgba(124,107,255,0.16)" delay={0} />
        <Orb x="65%" y="0%"  size={360} color="rgba(255,107,157,0.12)" delay={2} />

        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 70% 55% at 50% 50%, black, transparent)',
        }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity, position: 'relative', zIndex: 1, width: '100%' }}>
          <div className="container" style={{ textAlign: 'center', padding: '60px 28px 80px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(124,107,255,0.1)', border: '1px solid rgba(124,107,255,0.22)',
                borderRadius: 100, padding: '6px 16px', marginBottom: 32,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c6bff', display: 'inline-block' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#a89aff', letterSpacing: 0.5 }}>Software Development Studio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(42px, 6.5vw, 82px)', fontWeight: 800, color: '#fff', marginBottom: 24, lineHeight: 1.06 }}
            >
              We Help You<br /><RotatingWord />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: '#7878a0', maxWidth: 520, margin: '0 auto 44px', lineHeight: 1.72 }}
            >
              CPT builds custom software, automation tools, and data platforms
              for companies that refuse to settle for off-the-shelf.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <Link to="/projects">
                <motion.span
                  whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(124,107,255,0.45)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '13px 30px', borderRadius: 10,
                    background: 'linear-gradient(135deg, #7c6bff, #ff6b9d)',
                    fontSize: 15, fontWeight: 700, color: '#fff',
                    boxShadow: '0 0 22px rgba(124,107,255,0.28)',
                  }}
                >
                  View Our Projects <ArrowRight size={15} />
                </motion.span>
              </Link>
              <a href="#contact">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '13px 30px', borderRadius: 10,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: 15, fontWeight: 600, color: '#ccc',
                  }}
                >
                  Get in Touch
                </motion.span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Services ────────────────────────────────────────────────────── */}
      <section id="services" style={{ padding: '100px 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <div style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: 3,
              textTransform: 'uppercase', color: '#7c6bff',
              background: 'rgba(124,107,255,0.1)', border: '1px solid rgba(124,107,255,0.2)',
              borderRadius: 100, padding: '5px 14px', marginBottom: 18,
            }}>What We Build</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 800, color: '#fff', marginBottom: 14 }}>
              Full-Stack Expertise.<br /><span className="grad-text">End-to-End Delivery.</span>
            </h2>
            <p style={{ fontSize: 16, color: '#7878a0', maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>
              From idea to production — we cover the full software lifecycle.
            </p>
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden"
            whileInView="show" viewport={{ once: true, amount: 0.1 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}
          >
            {SERVICES.map(s => <ServiceCard key={s.title} item={s} />)}
          </motion.div>
        </div>
      </section>

      {/* ── Projects teaser ─────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0 100px' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              borderRadius: 24, overflow: 'hidden', position: 'relative',
              background: 'linear-gradient(135deg, #0f0d20, #1a0d14, #0d1520)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: 'clamp(44px, 5vw, 72px)',
              textAlign: 'center',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: '-25%', left: '-5%', width: '40%', paddingBottom: '40%',
                borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,107,255,0.28), transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
              style={{
                position: 'absolute', bottom: '-20%', right: '-5%', width: '35%', paddingBottom: '35%',
                borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,157,0.22), transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: 3,
                textTransform: 'uppercase', color: '#6bffd4',
                background: 'rgba(107,255,212,0.1)', border: '1px solid rgba(107,255,212,0.2)',
                borderRadius: 100, padding: '5px 14px', marginBottom: 22,
              }}>Our Work</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 50px)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
                See What We've Built.
              </h2>
              <p style={{ fontSize: 16, color: '#8888a0', maxWidth: 420, margin: '0 auto 36px', lineHeight: 1.7 }}>
                Browse our project demos — live previews of real software we've shipped.
              </p>
              <Link to="/projects">
                <motion.span
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(124,107,255,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 32px', borderRadius: 10,
                    background: 'linear-gradient(135deg, #7c6bff, #ff6b9d)',
                    fontSize: 15, fontWeight: 700, color: '#fff',
                  }}
                >
                  Browse Projects <ArrowRight size={15} />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: '80px 0 100px', scrollMarginTop: '80px' }}>
        <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
              Ready to Start<br /><span className="grad-text">Your Project?</span>
            </h2>
            <p style={{ fontSize: 16, color: '#7878a0', marginBottom: 32, lineHeight: 1.7 }}>
              Drop us a message and we'll respond within one business day.
            </p>
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  )
}

function ContactForm() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (email && msg) setSent(true)
  }

  if (sent) return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      style={{
        background: 'rgba(107,255,212,0.08)', border: '1px solid rgba(107,255,212,0.25)',
        borderRadius: 14, padding: '28px 24px', color: '#6bffd4', fontWeight: 600, fontSize: 16,
      }}
    >
      ✓ Message received — we'll be in touch soon.
    </motion.div>
  )

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input
        type="email" value={email} onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com" required
        style={iStyle}
        onFocus={e => e.target.style.borderColor = 'rgba(124,107,255,0.45)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
      <textarea
        value={msg} onChange={e => setMsg(e.target.value)}
        placeholder="Tell us about your project..." required rows={4}
        style={{ ...iStyle, resize: 'vertical', minHeight: 100 }}
        onFocus={e => e.target.style.borderColor = 'rgba(124,107,255,0.45)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(124,107,255,0.4)' }}
        whileTap={{ scale: 0.97 }}
        style={{
          padding: '14px', borderRadius: 10, cursor: 'pointer',
          background: 'linear-gradient(135deg, #7c6bff, #ff6b9d)',
          border: 'none', color: '#fff', fontSize: 15, fontWeight: 700,
        }}
      >
        Send Message
      </motion.button>
    </form>
  )
}

const iStyle = {
  padding: '12px 16px', borderRadius: 10, fontSize: 14, outline: 'none',
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#e8e8f0', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s',
}
