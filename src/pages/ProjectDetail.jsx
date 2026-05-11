import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, GitBranch, Tag, Layers } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT DETAIL PAGES
// Add an entry here for every project that has a slug in ProjectsPage.jsx.
// The key must match the slug exactly.
// ─────────────────────────────────────────────────────────────────────────────
const DETAIL_PAGES = {
  alpha: {
    title: 'Project Alpha',
    tagline: 'Your one-line elevator pitch goes here.',
    accent: '#7c6bff',
    visual: ['#12102a', '#1a1040'],
    status: 'Live',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    overview: `This is where you describe Project Alpha in full. What problem does it solve? Who is it built for? What makes it different?

Replace this text with real content when you're ready. You can write multiple paragraphs — each blank line becomes a new paragraph.`,
    features: [
      'Feature one — describe what it does',
      'Feature two — describe what it does',
      'Feature three — describe what it does',
      'Feature four — describe what it does',
    ],
    demoUrl: null,   // set to the live demo URL when ready
    repoUrl: null,   // set to the repo URL when ready
  },
}

const STATUS_STYLE = {
  'Live':           { bg: 'rgba(107,255,212,0.12)', border: 'rgba(107,255,212,0.3)',  text: '#6bffd4', dot: '#6bffd4' },
  'Beta':           { bg: 'rgba(124,107,255,0.12)', border: 'rgba(124,107,255,0.3)',  text: '#a89aff', dot: '#7c6bff' },
  'In Development': { bg: 'rgba(255,184,107,0.12)', border: 'rgba(255,184,107,0.3)',  text: '#ffca80', dot: '#ffb86b' },
  'Archived':       { bg: 'rgba(100,100,120,0.12)', border: 'rgba(100,100,120,0.28)', text: '#778',    dot: '#556' },
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = DETAIL_PAGES[slug]

  // ── 404 fallback ─────────────────────────────────────────────────────────
  if (!project) {
    return (
      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 28px' }}>
        <div>
          <div style={{ fontSize: 64, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: 'rgba(255,255,255,0.06)', marginBottom: 16 }}>404</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Project not found</div>
          <div style={{ fontSize: 14, color: '#6b6b88', marginBottom: 32 }}>This project page doesn't exist yet.</div>
          <Link to="/projects">
            <motion.span
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 24px', borderRadius: 10,
                background: 'linear-gradient(135deg, #7c6bff, #ff6b9d)',
                fontSize: 14, fontWeight: 700, color: '#fff',
              }}
            >
              <ArrowLeft size={14} /> Back to Projects
            </motion.span>
          </Link>
        </div>
      </section>
    )
  }

  const ss = STATUS_STYLE[project.status] || STATUS_STYLE['Archived']
  const paragraphs = project.overview.split('\n\n').filter(Boolean)

  return (
    <section style={{ padding: '100px 0 120px' }}>
      <div className="container" style={{ maxWidth: 860 }}>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 40 }}
        >
          <Link to="/projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            fontSize: 13, fontWeight: 600, color: '#6b6b88',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#6b6b88'}
          >
            <ArrowLeft size={14} /> All Projects
          </Link>
        </motion.div>

        {/* Hero block */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Visual banner */}
          <div style={{
            borderRadius: 20, overflow: 'hidden', marginBottom: 40,
            background: `linear-gradient(135deg, ${project.visual[0]}, ${project.visual[1]})`,
            aspectRatio: '21/9', position: 'relative',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at 70% 40%, ${project.accent}30, transparent 60%)`,
            }} />
            {/* Large initial watermark */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(60px, 12vw, 120px)',
              color: `${project.accent}20`, userSelect: 'none', letterSpacing: -4,
            }}>
              {project.title.split(' ').map(w => w[0]).join('')}
            </div>
            {/* Placeholder label */}
            <div style={{
              position: 'absolute', bottom: 20, left: 24,
              fontSize: 11, fontWeight: 700, letterSpacing: 2,
              color: `${project.accent}80`, textTransform: 'uppercase',
            }}>
              Screenshot / Demo preview goes here
            </div>
          </div>

          {/* Title + meta */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20,
                background: ss.bg, border: `1px solid ${ss.border}`, color: ss.text,
              }}>
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 5, height: 5, borderRadius: '50%', background: ss.dot, display: 'inline-block' }}
                />
                {project.status}
              </span>
              {project.tags.map(t => (
                <span key={t} style={{
                  fontSize: 11, padding: '3px 9px', borderRadius: 5,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#55558a', fontFamily: 'monospace',
                }}>
                  {t}
                </span>
              ))}
            </div>

            <h1 style={{
              fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800, color: '#fff', marginBottom: 12, lineHeight: 1.1,
            }}>
              {project.title}
            </h1>
            <p style={{ fontSize: 18, color: '#8888a0', lineHeight: 1.6 }}>
              {project.tagline}
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 56 }}>
            {project.demoUrl ? (
              <motion.a
                href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: `0 0 24px ${project.accent}50` }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '12px 26px', borderRadius: 10,
                  background: `linear-gradient(135deg, ${project.accent}, ${project.accent}bb)`,
                  fontSize: 14, fontWeight: 700, color: '#fff',
                }}
              >
                <ExternalLink size={14} /> Live Demo
              </motion.a>
            ) : (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '12px 26px', borderRadius: 10,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
                fontSize: 14, fontWeight: 600, color: '#44445a',
              }}>
                <ExternalLink size={14} /> Demo coming soon
              </div>
            )}
            {project.repoUrl && (
              <motion.a
                href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '12px 22px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: 14, fontWeight: 600, color: '#ccc',
                }}
              >
                <GitBranch size={14} /> Repository
              </motion.a>
            )}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 48 }} />

          {/* Overview */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800,
              color: '#fff', marginBottom: 20,
            }}>
              Overview
            </h2>
            {paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 16, color: '#8888a0', lineHeight: 1.8, marginBottom: 16 }}>
                {p}
              </p>
            ))}
          </div>

          {/* Features */}
          <div style={{
            background: 'rgba(13,13,22,0.6)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16, padding: '28px 28px',
            backdropFilter: 'blur(12px)',
          }}>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 800,
              color: '#fff', marginBottom: 20,
            }}>
              Key Features
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {project.features.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, color: '#c0c0d8' }}
                >
                  <span style={{
                    width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                    background: `${project.accent}20`, border: `1px solid ${project.accent}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, color: project.accent, fontWeight: 700,
                  }}>
                    {i + 1}
                  </span>
                  {f}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Edit hint */}
          <div style={{
            marginTop: 48, display: 'flex', alignItems: 'flex-start', gap: 10,
            background: 'rgba(124,107,255,0.07)', border: '1px solid rgba(124,107,255,0.18)',
            borderRadius: 12, padding: '14px 18px',
          }}>
            <Layers size={14} color="#7c6bff" style={{ marginTop: 2, flexShrink: 0 }} />
            <div style={{ fontSize: 12, color: '#7777aa', lineHeight: 1.6 }}>
              <strong style={{ color: '#a89aff' }}>To update this page:</strong>{' '}
              edit the <code style={{ background: 'rgba(255,255,255,0.07)', padding: '1px 6px', borderRadius: 4, fontSize: 11 }}>DETAIL_PAGES.alpha</code>{' '}
              object in{' '}
              <code style={{ background: 'rgba(255,255,255,0.07)', padding: '1px 6px', borderRadius: 4, fontSize: 11 }}>src/pages/ProjectDetail.jsx</code>.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
