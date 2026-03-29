// Office.jsx — Cinematic 3D Command Center (Three.js WebGL)
import { useEffect, useRef, useState } from 'react'

const GATEWAY = 'http://100.119.58.128:18789'
const TOKEN = import.meta.env.VITE_OPENCLAW_TOKEN || ''

const AGENT_STATES = {
  idle:        { label: 'Standing By',  color: '#4d8eff', pulse: false },
  building:    { label: 'Building',     color: '#22d68a', pulse: true  },
  researching: { label: 'Researching',  color: '#38d9f5', pulse: true  },
  writing:     { label: 'Writing',      color: '#9b6dff', pulse: true  },
  deploying:   { label: 'Deploying',    color: '#f5a623', pulse: true  },
  error:       { label: 'Issue',        color: '#ff4d6a', pulse: false },
}

// Live intel pulled from workspace memory + crons
const LIVE_INTEL = [
  { time: 'NOW',    text: 'BEQPROD Command Center v3 — 3D rebuild deploying', color: '#22d68a' },
  { time: '06:19',  text: 'Star Office pixel art installed + running on port 19000', color: '#4d8eff' },
  { time: '05:47',  text: 'Burbank Roofing v2 live: evolve-smarter.github.io/burbank-roofing-v2', color: '#4d8eff' },
  { time: '05:30',  text: 'Evolve Home Services v2 deployed — GSAP scroll + Kling slots', color: '#4d8eff' },
  { time: '05:15',  text: 'Evolve Recovery v2 deployed — Imagen hero + luxury serif design', color: '#4d8eff' },
  { time: '04:58',  text: 'Alex Finn Mission Control reviewed — rebuilding to match + exceed', color: '#9b6dff' },
  { time: '04:30',  text: 'taste-skill design system downloaded from Leon Lin / Nick Saraev method', color: '#38d9f5' },
  { time: '03:45',  text: 'WeryAI audit: hero-kling.mp4 rendered but not deployed — fixed', color: '#f5a623' },
  { time: 'DAY 4',  text: 'Cyph Da Cyber Chimp mascot created — half chimp half chrome AI robot', color: '#9b6dff' },
  { time: 'DAY 1',  text: 'Cyph born — BEQPROD LLC AI co-founder. Goal: $10k MRR by April 30.', color: '#22d68a' },
]

function ThreeScene({ agentState, currentTask }) {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Load Three.js dynamically
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
    script.onload = () => initScene()
    document.head.appendChild(script)

    function initScene() {
      const THREE = window.THREE
      const W = canvas.offsetWidth, H = canvas.offsetHeight

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
      camera.position.set(0, 0, 5)

      // ── FLOATING HOLOGRAPHIC RINGS ──
      const rings = []
      const ringColors = [0x4d8eff, 0x22d68a, 0x38d9f5, 0x9b6dff, 0xf5a623]
      for (let i = 0; i < 5; i++) {
        const geo = new THREE.TorusGeometry(1.2 + i * 0.7, 0.015, 8, 80)
        const mat = new THREE.MeshBasicMaterial({
          color: ringColors[i % ringColors.length],
          transparent: true,
          opacity: 0.15 + i * 0.04,
        })
        const ring = new THREE.Mesh(geo, mat)
        ring.rotation.x = Math.PI / 2 + (i * Math.PI) / 8
        ring.rotation.y = (i * Math.PI) / 6
        rings.push(ring)
        scene.add(ring)
      }

      // ── CENTRAL GLOWING CORE ──
      const coreGeo = new THREE.IcosahedronGeometry(0.5, 2)
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0x4d8eff,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      })
      const core = new THREE.Mesh(coreGeo, coreMat)
      scene.add(core)

      // Core inner solid
      const innerGeo = new THREE.IcosahedronGeometry(0.3, 1)
      const innerMat = new THREE.MeshBasicMaterial({ color: 0x22d68a, transparent: true, opacity: 0.8 })
      const inner = new THREE.Mesh(innerGeo, innerMat)
      scene.add(inner)

      // ── FLOATING DATA PARTICLES ──
      const particleCount = 200
      const positions = new Float32Array(particleCount * 3)
      const particleColors = new Float32Array(particleCount * 3)
      const palette = [
        [0.3, 0.56, 1.0],   // blue
        [0.13, 0.84, 0.54],  // green
        [0.22, 0.85, 0.96],  // cyan
        [0.61, 0.43, 1.0],   // purple
      ]
      for (let i = 0; i < particleCount; i++) {
        const r = 2 + Math.random() * 3
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = r * Math.cos(phi)
        const c = palette[Math.floor(Math.random() * palette.length)]
        particleColors[i * 3] = c[0]; particleColors[i * 3 + 1] = c[1]; particleColors[i * 3 + 2] = c[2]
      }
      const pGeo = new THREE.BufferGeometry()
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      pGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))
      const pMat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.7 })
      const particles = new THREE.Points(pGeo, pMat)
      scene.add(particles)

      // ── ORBITING AGENT NODES ──
      const agentNodes = []
      const agentNodeColors = [0x4d8eff, 0x22d68a, 0x38d9f5, 0x9b6dff, 0xf5a623, 0xff4d6a, 0x4d8eff]
      for (let i = 0; i < 7; i++) {
        const geo = new THREE.OctahedronGeometry(0.08, 0)
        const mat = new THREE.MeshBasicMaterial({ color: agentNodeColors[i], transparent: true, opacity: 0.9 })
        const node = new THREE.Mesh(geo, mat)
        const orbitR = 1.4 + (i % 3) * 0.4
        const angle = (i / 7) * Math.PI * 2
        node.position.set(Math.cos(angle) * orbitR, Math.sin(angle * 0.5) * 0.4, Math.sin(angle) * orbitR)
        node.userData = { orbitR, angle, speed: 0.003 + i * 0.001, yOffset: Math.sin(i) * 0.3 }
        agentNodes.push(node)
        scene.add(node)
      }

      // ── CONNECTING LINES ──
      const lineMat = new THREE.LineBasicMaterial({ color: 0x4d8eff, transparent: true, opacity: 0.12 })
      for (let i = 0; i < agentNodes.length; i++) {
        const pts = [agentNodes[i].position, core.position]
        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts)
        scene.add(new THREE.Line(lineGeo, lineMat))
      }

      // ── GRID FLOOR ──
      const gridHelper = new THREE.GridHelper(20, 30, 0x4d8eff, 0x112244)
      gridHelper.position.y = -2.5
      gridHelper.material.transparent = true
      gridHelper.material.opacity = 0.25
      scene.add(gridHelper)

      // Fog
      scene.fog = new THREE.FogExp2(0x000814, 0.08)

      // ── ANIMATION ──
      let frame = 0
      let animId

      function animate() {
        animId = requestAnimationFrame(animate)
        frame++
        const t = frame * 0.008

        // Rotate rings
        rings.forEach((ring, i) => {
          ring.rotation.z += 0.002 * (i % 2 === 0 ? 1 : -1)
          ring.rotation.x += 0.001 * (i % 3 === 0 ? 1 : -0.5)
        })

        // Pulse core
        const pulse = 1 + Math.sin(t * 2) * 0.08
        core.scale.set(pulse, pulse, pulse)
        inner.rotation.x += 0.015
        inner.rotation.y += 0.02

        // Orbit agent nodes
        agentNodes.forEach(node => {
          node.userData.angle += node.userData.speed
          const a = node.userData.angle
          const r = node.userData.orbitR
          node.position.x = Math.cos(a) * r
          node.position.z = Math.sin(a) * r
          node.position.y = Math.sin(a * 1.3) * 0.5 + node.userData.yOffset
          node.rotation.y += 0.03
        })

        // Slowly rotate particles
        particles.rotation.y += 0.001
        particles.rotation.x += 0.0005

        // Gentle camera float
        camera.position.x = Math.sin(t * 0.3) * 0.3
        camera.position.y = Math.sin(t * 0.2) * 0.2
        camera.lookAt(0, 0, 0)

        renderer.render(scene, camera)
      }

      animate()
      sceneRef.current = { renderer, animId }

      // Resize handler
      const onResize = () => {
        const W = canvas.offsetWidth, H = canvas.offsetHeight
        camera.aspect = W / H
        camera.updateProjectionMatrix()
        renderer.setSize(W, H)
      }
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    return () => {
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animId)
        sceneRef.current.renderer.dispose()
      }
      document.head.removeChild(script)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}

export default function Office() {
  const [agentState, setAgentState] = useState('building')
  const [currentTask, setCurrentTask] = useState('Building BEQPROD Mission Control')
  const [intelIdx, setIntelIdx] = useState(0)

  // Cycle intel feed
  useEffect(() => {
    const iv = setInterval(() => setIntelIdx(i => (i + 1) % LIVE_INTEL.length), 4000)
    return () => clearInterval(iv)
  }, [])

  const sc = AGENT_STATES[agentState] || AGENT_STATES.idle

  const g = { glass: 'rgba(255,255,255,0.028)', gborder: 'rgba(255,255,255,0.07)' }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#000814' }}>

      {/* 3D Scene - takes most of the height */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <ThreeScene agentState={agentState} currentTask={currentTask} />

        {/* HUD overlay — top left */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(0,8,20,0.75)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(77,142,255,0.2)', borderRadius: 10,
          padding: '10px 14px', minWidth: 160,
        }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#4d8eff', textTransform: 'uppercase', marginBottom: 4 }}>CYPH 🔐</div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#e8eaf6', marginBottom: 6 }}>Command Center</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: sc.color, flexShrink: 0,
              boxShadow: `0 0 8px ${sc.color}`,
              animation: sc.pulse ? 'pdot 1.5s ease-in-out infinite' : 'none',
            }} />
            <span style={{ fontSize: '0.68rem', color: sc.color, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{sc.label}</span>
          </div>
        </div>

        {/* HUD overlay — top right: agent nodes */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(0,8,20,0.75)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(77,142,255,0.2)', borderRadius: 10,
          padding: '8px 12px',
        }}>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.18em', color: '#4d8eff', textTransform: 'uppercase', marginBottom: 6 }}>Active Agents</div>
          {[
            { name: 'CYPHER', color: '#4d8eff', active: true },
            { name: 'IVY',    color: '#22d68a', active: true },
            { name: 'NEXUS',  color: '#9b6dff', active: true },
            { name: 'WOLF',   color: '#f5a623', active: false },
            { name: 'MR. X',  color: '#ff4d6a', active: true },
          ].map(a => (
            <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: a.color, flexShrink: 0, opacity: a.active ? 1 : 0.3 }} />
              <span style={{ fontSize: '0.62rem', color: a.active ? '#e8eaf6' : '#555d80', fontWeight: a.active ? 600 : 400 }}>{a.name}</span>
            </div>
          ))}
        </div>

        {/* Intel ticker — bottom of scene */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(0,8,20,0.95), rgba(0,8,20,0))',
          padding: '24px 14px 10px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.58rem', color: '#ff4d6a', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', flexShrink: 0 }}>● LIVE</span>
            <span style={{ fontSize: '0.65rem', color: LIVE_INTEL[intelIdx].color, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              [{LIVE_INTEL[intelIdx].time}] {LIVE_INTEL[intelIdx].text}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom panel — current task + state controls */}
      <div style={{ background: 'rgba(0,8,20,0.95)', borderTop: '1px solid rgba(77,142,255,0.15)', padding: '10px 14px', flexShrink: 0 }}>
        {/* Current task */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: '0.6rem', color: '#555d80', letterSpacing: '0.12em', textTransform: 'uppercase', flexShrink: 0 }}>Task:</span>
          <input
            value={currentTask}
            onChange={e => setCurrentTask(e.target.value)}
            style={{
              flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
              color: '#e8eaf6', padding: '4px 10px', borderRadius: 6, fontSize: '0.75rem',
              outline: 'none', fontFamily: 'inherit',
            }}
          />
        </div>

        {/* State pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {Object.entries(AGENT_STATES).map(([key, cfg]) => (
            <button key={key} onClick={() => setAgentState(key)} style={{
              padding: '4px 10px', borderRadius: 16, fontSize: '10px', fontWeight: 700,
              cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase',
              background: agentState === key ? `${cfg.color}20` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${agentState === key ? cfg.color : 'rgba(255,255,255,0.08)'}`,
              color: agentState === key ? cfg.color : '#555d80',
              transition: 'all 0.15s',
            }}>{cfg.label}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
