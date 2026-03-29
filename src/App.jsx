import { useState } from 'react'
import StarField from './components/StarField'
import TabNav from './components/TabNav'
import Dashboard from './tabs/Dashboard'
import Tasks from './tabs/Tasks'
import Projects from './tabs/Projects'
import Memory from './tabs/Memory'
import Documents from './tabs/Documents'
import Chat from './tabs/Chat'
import Goals from './tabs/Goals'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const tabs = {
    dashboard: <Dashboard />,
    tasks: <Tasks />,
    projects: <Projects />,
    memory: <Memory />,
    documents: <Documents />,
    chat: <Chat />,
    goals: <Goals />,
  }

  return (
    <div style={{ position: 'relative', height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StarField />
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        {tabs[activeTab]}
      </div>
      <TabNav active={activeTab} onChange={setActiveTab} />
    </div>
  )
}
