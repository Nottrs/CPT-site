import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, GitBranch, Tag, ArrowUpRight, Layers } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// ADD YOUR PROJECTS HERE
// Each project can have:
//   title       - project name
//   desc        - one-sentence description
//   longDesc    - fuller description shown on the card
//   tags        - tech stack / category tags
//   category    - used for filter tabs
//   demoUrl     - link to live demo  (set to null if not available)
//   repoUrl     - link to GitHub repo (set to null if private)
//   status      - 'Live' | 'In Development' | 'Beta' | 'Archived'
//   accent      - card accent colour (hex)
//   visual      - colour stops for the card thumbnail gradient (2-element array)
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 0,
    title: 'CPT Tajmer',
    desc: 'Pomodoro tajmer — 25 min fokus, 5 min pauza, duga pauza na svakih 4 runde.',
    longDesc: 'Pomodoro tehnika za produktivnost: fokusiraj se 25 minuta, odmori 5 minuta. Vizuelni krug napretka, zvučni signal, automatsko smenjivanje modova.',
    tags: ['React', 'Vite', 'Web Audio API'],
    category: 'Web App',
    demoUrl: '/apps/cpt-tajmer',
    repoUrl: null,
    status: 'Live',
    accent: '#a89aff',
    visual: ['#0e0c22', '#14103a'],
  },
  {
    id: 1,
    title: 'Project Alpha',
    desc: 'Your flagship product — replace this with a real description.',
    longDesc: 'Add a longer description here. Explain what the project does, who it is for, and what makes it interesting.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    category: 'Web App',
    demoUrl: null,
    repoUrl: null,
    status: 'Live',
    accent: '#7c6bff',
    visual: ['#12102a', '#1a1040'],
    slug: 'alpha',
  },
  {
    id: 2,
    title: 'Project Beta',
    desc: 'A second project — swap in your real project data.',
    longDesc: 'Add a longer description here. Explain what the project does, who it is for, and what makes it interesting.',
    tags: ['Python', 'FastAPI', 'Redis'],
    category: 'API',
    demoUrl: null,
    repoUrl: null,
    status: 'Beta',
    accent: '#ff6b9d',
    visual: ['#2a1018', '#1a0d20'],
  },
  {
    id: 3,
    title: 'Project Gamma',
    desc: 'Internal tooling or automation — describe it here.',
    longDesc: 'Add a longer description here. Explain what the project does, who it is for, and what makes it interesting.',
    tags: ['TypeScript', 'Electron', 'SQLite'],
    category: 'Desktop',
    demoUrl: null,
    repoUrl: null,
    status: 'In Development',
    accent: '#6bffd4',
    visual: ['#0a2018', '#0d1a22'],
  },
  {
    id: 4,
    title: 'Project Delta',
    desc: 'A data or analytics tool — replace with real details.',
    longDesc: 'Add a longer description here. Explain what the project does, who it is for, and what makes it interesting.',
    tags: ['Vue', 'D3.js', 'BigQuery'],
    category: 'Web App',
    demoUrl: null,
    repoUrl: null,
    status: 'Live',
    accent: '#ffb86b',
    visual: ['#22180a', '#2a200d'],
  },
  {
    id: 5,
    title: 'Project Epsilon',
    desc: 'A mobile or cross-platform app — describe it here.',
    longDesc: 'Add a longer description here. Explain what the project does, who it is for, and what makes it interesting.',
    tags: ['React Native', 'Expo', 'Supabase'],
    category: 'Mobile',
    demoUrl: null,
    repoUrl: null,
    status: 'Beta',
    accent: '#6bc8ff',
    visual: ['#0a1828', '#0d1530'],
  },
  {
    id: 6,
    title: 'Project Zeta',
    desc: 'An automation or integration pipeline — add your description.',
    longDesc: 'Add a longer description here. Explain what the project does, who it is for, and what makes it interesting.',
    tags: ['Python', 'Celery', 'Docker'],
    category: 'Automation',
    demoUrl: null,
    repoUrl: null,
    status: 'Live',
    accent: '#ff9e6b',
    visual: ['#2a140a', '#201010'],
  },
]

const STATUS_STYLE = {
  'Live':           { bg: 'rgba(107,255,212,0.12)', border: 'rgba(107,255,212,0.3)',  text: '#6bffd4', dot: '#6bffd4' },
  'Beta':           { bg: 'rgba(124,107,255,0.12)', border: 'rgba(124,107,255,0.3)',  text: '#a89aff', dot: '#7c6bff' },
  'In Development': { bg: 'rgba(255,184,107,0.12)', border: 'rgba(255,184,107,0.3)',  text: '#ffca80', dot: '#ffb86b' },
  'Archived':       { bg: 'rgba(100,100,120,0.12)', border: 'rgba(100,100,120,0.28)', text: '#778',    dot: '#556' },
}

const CATEGORIES = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))]

// ── Card thumbnail ────────────────────────────────────────────────────────
function CardVisual({ project, hov }) {
  return (
    <div style={{
      aspectRatio: '16/9', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg, ${project.visual[0]}, ${project.visual[1]})`,
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 75% 30%, ${project.accent}28, transparent 60%)`,
      }} />

      {/* Abstract placeholder shapes */}
      <div style={{
        position: 'absolute', top: '15%', left: '10%',
        width: '40%', height: '35%',
        background: `${project.accent}18`,
        borderRadius: 10,
        border: `1px solid ${project.accent}30`,
      }} />
      <div style={{
        position: 'absolute', top: '30%', left: '25%',
        width: '55%', height: '8px',
        background: `${project.accent}25`,
        borderRadius: 4,
      }} />
      <div style={{
        position: 'absolute', top: '45%', left: '25%',
        width: '38%', height: '8px',
        background: `rgba(255,255,255,0.07)`,
        borderRadius: 4,
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '10%',
        width: '28%', height: '28%',
        border: `1px solid ${project.accent}40`,
        borderRadius: '50%',
        background: `${project.accent}10`,
      }} />

      {/* Project initial */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        fontFamily: 'Syne, sans-serif', fontWeight: 800,
        fontSize: 42, color: `${project.accent}30`,
        userSelect: 'none', letterSpacing: -2,
      }}>
        {project.title.split(' ').map(w => w[0]).join('')}
      </div>

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(5,5,8,0.55)', backdropFilter: 'blur(3px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        }}
      >
        {project.demoUrl && (
          project.demoUrl.startsWith('/') ? (
            <Link to={project.demoUrl} onClick={e => e.stopPropagation()}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                background: `linear-gradient(135deg, ${project.accent}, ${project.accent}bb)`,
                color: '#fff', textDecoration: 'none',
              }}
            >
              <ExternalLink size={13} /> Otvori
            </Link>
          ) : (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                background: `linear-gradient(135deg, ${project.accent}, ${project.accent}bb)`,
                color: '#fff',
              }}
            >
              <ExternalLink size={13} /> Live Demo
            </a>
          )
        )}
        {!project.demoUrl && (
          <div style={{
            padding: '8px 18px', borderRadius: 8, fontSize: 12, fontWeight: 600,
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            color: '#888',
          }}>
            Demo coming soon
          </div>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#ccc',
            }}
          >
            <GitBranch size={13} />
          </a>
        )}
      </motion.div>
    </div>
  )
}

// ── Single project card ───────────────────────────────────────────────────
function ProjectCard({ project }) {
  const [hov, setHov] = useState(false)
  const ss = STATUS_STYLE[project.status] || STATUS_STYLE['Archived']
  const hasPage = !!project.slug

  const card = (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        borderRadius: 16, overflow: 'hidden',
        cursor: hasPage ? 'pointer' : 'default',
        background: hov ? 'rgba(17,17,28,0.95)' : 'rgba(11,11,20,0.7)',
        border: `1px solid ${hov ? project.accent + '55' : 'rgba(255,255,255,0.07)'}`,
        backdropFilter: 'blur(12px)',
        transition: 'background 0.3s, border 0.3s',
        display: 'flex', flexDirection: 'column',
        transform: hov && hasPage ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <CardVisual project={project} hov={hov} />

      <div style={{ padding: '20px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div>
            <div style={{
              fontFamily: 'Syne, sans-serif', fontSize: 17, fontWeight: 800,
              color: '#fff', lineHeight: 1.25, marginBottom: 4,
            }}>
              {project.title}
            </div>
            <div style={{ fontSize: 13, color: '#6b6b88', lineHeight: 1.55 }}>
              {project.desc}
            </div>
          </div>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0, marginTop: 2 }}>
              <motion.div
                animate={{ opacity: hov ? 1 : 0.4 }}
                style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: project.accent + '20', border: `1px solid ${project.accent}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: project.accent,
                }}
              >
                <ArrowUpRight size={14} />
              </motion.div>
            </a>
          )}
        </div>

        {/* Status + category */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20,
            background: ss.bg, border: `1px solid ${ss.border}`, color: ss.text,
          }}>
            <motion.span
              animate={{ opacity: project.status === 'Live' || project.status === 'In Development' ? [1, 0.3, 1] : 1 }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 5, height: 5, borderRadius: '50%', background: ss.dot, display: 'inline-block' }}
            />
            {project.status}
          </span>
          <span style={{
            fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            color: '#666680',
          }}>
            {project.category}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto', paddingTop: 6 }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontSize: 11, padding: '2px 8px', borderRadius: 5,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: '#55558a', fontFamily: 'monospace',
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )

  return hasPage
    ? <Link to={`/projects/${project.slug}`} style={{ display: 'block', textDecoration: 'none' }}>{card}</Link>
    : card
}

// ── Page ─────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeStatus, setActiveStatus] = useState('All')

  const filtered = PROJECTS.filter(p => {
    const cat = activeCategory === 'All' || p.category === activeCategory
    const st  = activeStatus  === 'All' || p.status   === activeStatus
    return cat && st
  })

  const statusOptions = ['All', ...Array.from(new Set(PROJECTS.map(p => p.status)))]

  return (
    <section style={{ padding: '100px 0 120px' }}>
      <div className="container">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 56 }}
        >
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: '#7c6bff',
            background: 'rgba(124,107,255,0.1)', border: '1px solid rgba(124,107,255,0.2)',
            borderRadius: 100, padding: '5px 14px', marginBottom: 20,
          }}>
            Our Work
          </div>
          <h1 style={{
            fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: 800, color: '#fff', marginBottom: 16,
          }}>
            Project Demos
          </h1>
          <p style={{ fontSize: 17, color: '#7878a0', maxWidth: 520, lineHeight: 1.7, marginBottom: 36 }}>
            Live previews and demos of software we've built.
            Click a card to launch the demo, or explore the source.
          </p>

          {/* How to add a project hint */}
          <div style={{
            display: 'inline-flex', alignItems: 'flex-start', gap: 10,
            background: 'rgba(124,107,255,0.07)', border: '1px solid rgba(124,107,255,0.18)',
            borderRadius: 12, padding: '12px 18px', maxWidth: 540,
          }}>
            <Layers size={15} color="#7c6bff" style={{ marginTop: 1, flexShrink: 0 }} />
            <div style={{ fontSize: 12, color: '#7777aa', lineHeight: 1.6 }}>
              <strong style={{ color: '#a89aff' }}>To add a project:</strong>{' '}
              open <code style={{ background: 'rgba(255,255,255,0.07)', padding: '1px 6px', borderRadius: 4, fontSize: 11 }}>
                src/pages/ProjectsPage.jsx
              </code>{' '}
              and edit the <code style={{ background: 'rgba(255,255,255,0.07)', padding: '1px 6px', borderRadius: 4, fontSize: 11 }}>
                PROJECTS
              </code> array at the top of the file.
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap', alignItems: 'center' }}
        >
          {/* Category filter */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {CATEGORIES.map(c => (
              <FilterBtn key={c} active={activeCategory === c} onClick={() => setActiveCategory(c)}>
                {c}
              </FilterBtn>
            ))}
          </div>

          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.08)' }} />

          {/* Status filter */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {statusOptions.map(s => (
              <FilterBtn key={s} active={activeStatus === s} onClick={() => setActiveStatus(s)} small>
                {s === 'All' ? 'All Status' : s}
              </FilterBtn>
            ))}
          </div>

          <div style={{ marginLeft: 'auto', fontSize: 13, color: '#44445a' }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div layout style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '80px 20px' }}
          >
            <div style={{ fontSize: 15, color: '#44445a' }}>No projects match the selected filters.</div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function FilterBtn({ active, onClick, children, small }) {
  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      style={{
        padding: small ? '6px 12px' : '8px 16px',
        borderRadius: 20, cursor: 'pointer',
        background: active ? 'linear-gradient(135deg, #7c6bff, #ff6b9d)' : 'rgba(255,255,255,0.04)',
        border: active ? 'none' : '1px solid rgba(255,255,255,0.08)',
        color: active ? '#fff' : '#7777a0',
        fontSize: small ? 12 : 13, fontWeight: 600,
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      {children}
    </motion.button>
  )
}
