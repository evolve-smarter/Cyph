import { useState } from 'react'
import StarField from './components/StarField'
import TabNav from './components/TabNav'
import Dashboard from './tabs/Dashboard'
import Chat from './tabs/Chat'
import Intel from './tabs/Intel'
import Goals from './tabs/Goals'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const tabs = {
    dashboard: <Dashboard />,
    chat: <Chat />,
    intel: <Intel />,
    goals: <Goals />,
  }

  return (
    <div style={{ position: 'relative', height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StarField />
      
      {/* Main content area */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        {tabs[activeTab]}
      </div>

      {/* Bottom nav */}
      <TabNav active={activeTab} onChange={setActiveTab} />
    </div>
  )
}
