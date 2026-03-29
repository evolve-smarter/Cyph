// Office.jsx — Cinematic 3D Command Center
import { useEffect, useRef, useState } from 'react'

const AGENT_STATES = {
  idle:        { label: 'Standing By',  color: '#4d8eff' },
  building:    { label: 'Building',     color: '#22d68a' },
  researching: { label: 'Researching',  color: '#38d9f5' },
  writing:     { label: 'Writing',      color: '#9b6dff' },
  deploying:   { label: 'Deploying',    color: '#f5a623' },
  error:       { label: 'Issue',        color: '#ff4d6a' },
}

const LIVE_INTEL = [
  { time: 'NOW',   text: '3D Command Center deployed — WebGL cinematic scene live', color: '#22d68a' },
  { time: '06:26', text: 'Bryce: "Make it prettier than pixel art" — 3D rebuild initiated', color: '#f5a623' },
  { time: '06:19', text: 'Alex Finn Office screen reviewed — exceeding it with WebGL', color: '#9b6dff' },
  { time: '05:47', text: 'Burbank Roofing v2 + Evolve v2 sites deployed to GitHub Pages', color: '#4d8eff' },
  { time: '04:58', text: 'PWA Mission Control upgraded: Tasks, Memory, Documents tabs', color: '#4d8eff' },
  { time: '04:00', text: 'Nick Saraev method locked in: taste-skill + GSAP + Kling slots', color: '#38d9f5' },
  { time: 'DAY 4', text: 'Cyph Da Cyber Chimp born — BEQPROD mascot', color: '#9b6dff' },
  { time: 'DAY 1', text: 'Cyph online — goal: $10k MRR by April 30, 2026', color: '#22d68a' },
]

const AGENTS_LIST = [
  { name: 'CYPHER', color: '#4d8eff', active: true,  role: 'Commander' },
  { name: 'IVY',    color: '#22d68a', active: true,  role: 'Research'  },
  { name: 'NEXUS',  color: '#9b6dff', active: true,  role: 'CTO'       },
  { name: 'WOLF',   color: '#f5a623', active: false, role: 'Outreach'  },
  { name: 'MR. X',  color: '#ff4d6a', active: true,  role: 'Social'    },
]

function ThreeScene({ agentState }) {
  const canvasRef = useRef(null)
  const cleanupRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
    script.onload = () => {
      const THREE = window.THREE
      const W = canvas.clientWidth || 300
      const H = canvas.clientHeight || 300

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
      renderer.setSize(W, H, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000814)

      const scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x000814, 0.04)

      const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200)
      camera.position.set(0, 1.5, 7)
      camera.lookAt(0, 0, 0)

      // ── CENTRAL TORUS KNOT ──
      const knotGeo = new THREE.TorusKnotGeometry(1.4, 0.28, 180, 24)
      const knotMat = new THREE.MeshPhongMaterial({
        color: 0x2255cc,
        emissive: 0x112244,
        specular: 0x88aaff,
        shininess: 180,
        transparent: true,
        opacity: 0.92,
      })
      const knot = new THREE.Mesh(knotGeo, knotMat)
      scene.add(knot)

      // Wireframe overlay
      const wireMat = new THREE.MeshBasicMaterial({ color: 0x38d9f5, wireframe: true, transparent: true, opacity: 0.12 })
      const knotWire = new THREE.Mesh(knotGeo, wireMat)
      scene.add(knotWire)

      // ── LIGHTS ──
      scene.add(new THREE.AmbientLight(0x0a0a1a, 1.5))
      const lights = [
        { color: 0x4d8eff, intensity: 4, pos: [0, 4, 0] },
        { color: 0x22d68a, intensity: 3, pos: [6, -2, 4] },
        { color: 0x9b6dff, intensity: 3, pos: [-6, 3, -4] },
        { color: 0x38d9f5, intensity: 2, pos: [0, -4, 6] },
      ]
      const lightObjects = lights.map(l => {
        const pt = new THREE.PointLight(l.color, l.intensity, 25)
        pt.position.set(...l.pos)
        scene.add(pt)
        return pt
      })

      // ── ORBITAL RINGS ──
      const ringData = [
        { r: 3.2, tilt: 0.4, color: 0x4d8eff, opacity: 0.18 },
        { r: 4.0, tilt: -0.6, color: 0x22d68a, opacity: 0.14 },
        { r: 4.8, tilt: 1.1, color: 0x9b6dff, opacity: 0.12 },
      ]
      ringData.forEach(rd => {
        const geo = new THREE.TorusGeometry(rd.r, 0.012, 6, 100)
        const mat = new THREE.MeshBasicMaterial({ color: rd.color, transparent: true, opacity: rd.opacity })
        const ring = new THREE.Mesh(geo, mat)
        ring.rotation.x = Math.PI / 2 + rd.tilt
        scene.add(ring)
      })

      // ── AGENT NODES ──
      const agentData = [
        { color: 0x4d8eff, r: 3.2, speed: 0.009, phase: 0 },
        { color: 0x22d68a, r: 4.0, speed: 0.007, phase: 1.2 },
        { color: 0x38d9f5, r: 3.6, speed: 0.011, phase: 2.4 },
        { color: 0x9b6dff, r: 4.8, speed: 0.005, phase: 3.8 },
        { color: 0xf5a623, r: 3.9, speed: 0.008, phase: 5.0 },
      ]
      const agentMeshes = agentData.map(a => {
        const geo = new THREE.OctahedronGeometry(0.1, 1)
        const mat = new THREE.MeshPhongMaterial({ color: a.color, emissive: a.color, emissiveIntensity: 0.7, shininess: 300 })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.userData = { ...a, angle: a.phase }
        const glow = new THREE.PointLight(a.color, 1.5, 2.5)
        mesh.add(glow)
        scene.add(mesh)
        return mesh
      })

      // ── PARTICLES ──
      const pCount = 1200
      const pPos = new Float32Array(pCount * 3)
      const pCol = new Float32Array(pCount * 3)
      const pPalette = [[0.3,0.56,1],[0.13,0.84,0.54],[0.22,0.85,0.96],[0.61,0.43,1],[0.96,0.65,0.14]]
      for (let i = 0; i < pCount; i++) {
        const r = 4 + Math.random() * 12
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        pPos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
        pPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta) * 0.5
        pPos[i*3+2] = r * Math.cos(phi)
        const c = pPalette[Math.floor(Math.random() * pPalette.length)]
        pCol[i*3]=c[0]; pCol[i*3+1]=c[1]; pCol[i*3+2]=c[2]
      }
      const pGeo = new THREE.BufferGeometry()
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3))
      const pMat = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.65 })
      const particles = new THREE.Points(pGeo, pMat)
      scene.add(particles)

      // ── GRID ──
      const grid = new THREE.GridHelper(50, 35, 0x0d2244, 0x050e1a)
      grid.position.y = -3.5
      grid.material.transparent = true
      grid.material.opacity = 0.4
      scene.add(grid)

      // ── ANIMATE ──
      let t = 0
      let rafId

      function animate() {
        rafId = requestAnimationFrame(animate)
        t += 0.01

        knot.rotation.x += 0.004
        knot.rotation.y += 0.007
        knotWire.rotation.copy(knot.rotation)

        // Pulse lights
        lightObjects[0].intensity = 4 + Math.sin(t * 2) * 1.5
        lightObjects[1].intensity = 3 + Math.cos(t * 1.7) * 1

        // Orbit agents
        agentMeshes.forEach(m => {
          m.userData.angle += m.userData.speed
          const a = m.userData.angle
          m.position.x = Math.cos(a) * m.userData.r
          m.position.z = Math.sin(a) * m.userData.r
          m.position.y = Math.sin(a * 0.8) * 0.6
          m.rotation.y += 0.04
        })

        particles.rotation.y += 0.0008

        // Camera float
        camera.position.x = Math.sin(t * 0.12) * 1.2
        camera.position.y = 1.5 + Math.sin(t * 0.09) * 0.4
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
      }

      animate()

      const onResize = () => {
        const W = canvas.clientWidth, H = canvas.clientHeight
        if (!W || !H) return
        camera.aspect = W / H
        camera.updateProjectionMatrix()
        renderer.setSize(W, H, false)
      }
      window.addEventListener('resize', onResize)

      cleanupRef.current = () => {
        cancelAnimationFrame(rafId)
        renderer.dispose()
        window.removeEventListener('resize', onResize)
      }
    }

    document.head.appendChild(script)
    return () => {
      cleanupRef.current?.()
      try { document.head.removeChild(script) } catch {}
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

export default function Office() {
  const [agentState, setAgentState] = useState('building')
  const [currentTask, setCurrentTask] = useState('Rebuilding BEQPROD Mission Control')
  const [intelIdx, setIntelIdx] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setIntelIdx(i => (i + 1) % LIVE_INTEL.length), 4500)
    return () => clearInterval(iv)
  }, [])

  const sc = AGENT_STATES[agentState] || AGENT_STATES.idle

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#000814', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* 3D Canvas */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <ThreeScene agentState={agentState} />

        {/* Top-left HUD */}
        <div style={{
          position: 'absolute', top: 10, left: 10,
          background: 'rgba(0,8,20,0.82)', backdropFilter: 'blur(14px)',
          border: '1px solid rgba(77,142,255,0.2)', borderRadius: 10,
          padding: '10px 14px',
        }}>
          <div style={{ fontSize: '0.52rem', letterSpacing: '0.22em', color: '#4d8eff', textTransform: 'uppercase', marginBottom: 3 }}>CYPH 🔐 · BEQPROD</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#e8eaf6', letterSpacing: '-0.01em', marginBottom: 7 }}>Command Center</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: sc.color,
              boxShadow: `0 0 10px ${sc.color}`,
              animation: 'pdot 1.5s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '0.68rem', color: sc.color, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{sc.label}</span>
          </div>
        </div>

        {/* Top-right HUD — agents */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: 'rgba(0,8,20,0.82)', backdropFilter: 'blur(14px)',
          border: '1px solid rgba(77,142,255,0.2)', borderRadius: 10,
          padding: '10px 12px',
        }}>
          <div style={{ fontSize: '0.52rem', letterSpacing: '0.2em', color: '#4d8eff', textTransform: 'uppercase', marginBottom: 7 }}>Agents Online</div>
          {AGENTS_LIST.map(a => (
            <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                background: a.active ? a.color : 'rgba(255,255,255,0.1)',
                boxShadow: a.active ? `0 0 6px ${a.color}` : 'none',
                animation: a.active ? 'pdot 2s ease-in-out infinite' : 'none',
              }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 600, color: a.active ? '#e8eaf6' : '#555d80', letterSpacing: '0.02em' }}>{a.name}</span>
              <span style={{ fontSize: '0.55rem', color: '#555d80', marginLeft: 'auto', paddingLeft: 6 }}>{a.role}</span>
            </div>
          ))}
        </div>

        {/* Bottom — live intel ticker */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(0,8,20,0.97) 0%, rgba(0,8,20,0) 100%)',
          padding: '28px 14px 10px',
          pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.55rem', color: '#ff4d6a', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', flexShrink: 0 }}>● LIVE INTEL</span>
            <span style={{ fontSize: '0.66rem', color: LIVE_INTEL[intelIdx].color, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'color 0.5s' }}>
              [{LIVE_INTEL[intelIdx].time}] {LIVE_INTEL[intelIdx].text}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div style={{ background: 'rgba(0,8,20,0.98)', borderTop: '1px solid rgba(77,142,255,0.12)', padding: '9px 12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: '0.58rem', color: '#555d80', letterSpacing: '0.12em', textTransform: 'uppercase', flexShrink: 0 }}>Active Task</span>
          <input
            value={currentTask}
            onChange={e => setCurrentTask(e.target.value)}
            style={{
              flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
              color: '#e8eaf6', padding: '4px 10px', borderRadius: 6, fontSize: '0.74rem',
              outline: 'none', fontFamily: 'inherit',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {Object.entries(AGENT_STATES).map(([key, cfg]) => (
            <button key={key} onClick={() => setAgentState(key)} style={{
              padding: '4px 9px', borderRadius: 14, fontSize: '10px', fontWeight: 700,
              cursor: 'pointer', letterSpacing: '0.04em', textTransform: 'uppercase',
              background: agentState === key ? `${cfg.color}22` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${agentState === key ? cfg.color : 'rgba(255,255,255,0.07)'}`,
              color: agentState === key ? cfg.color : '#555d80',
              transition: 'all 0.15s',
              boxShadow: agentState === key ? `0 0 8px ${cfg.color}44` : 'none',
            }}>{cfg.label}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
