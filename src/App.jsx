import { useState } from 'react'
import StarField from './components/StarField'
import TabNav from './components/TabNav'
import Dashboard from './tabs/Dashboard'
import Tasks from './tabs/Tasks'
import Projects from './tabs/Projects'
import Vault from './tabs/Vault'
import Office from './tabs/Office'
import Chat from './tabs/Chat'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const tabs = {
    dashboard: <Dashboard />,
    tasks:     <Tasks />,
    projects:  <Projects />,
    office:    <Office />,
    vault:     <Vault />,
    chat:      <Chat />,
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
