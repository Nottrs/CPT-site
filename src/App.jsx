import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetail from './pages/ProjectDetail'
import AppsPage from './pages/AppsPage'
import { APPS } from './apps'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/apps" element={<AppsPage />} />
          {APPS.map(app => (
            <Route
              key={app.slug}
              path={`/apps/${app.slug}`}
              element={
                <Suspense fallback={
                  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a4a60' }}>
                    Učitavanje...
                  </div>
                }>
                  <app.component />
                </Suspense>
              }
            />
          ))}
        </Routes>
      </main>
      <Footer />
    </>
  )
}
