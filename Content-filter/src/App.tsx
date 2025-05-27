// src/App.tsx
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isActive, setIsActive] = useState(true)
  const [blockedCount, setBlockedCount] = useState(0)

  useEffect(() => {
    chrome.storage.sync.get(['isActive'], (result) => {
      setIsActive(result.isActive !== false)
    })

    chrome.runtime.sendMessage({ type: 'GET_BLOCKED_COUNT' }, (response) => {
      setBlockedCount(response.count || 0)
    })
  }, [])

  const toggleActive = () => {
    const newActive = !isActive
    setIsActive(newActive)
    chrome.storage.sync.set({ isActive: newActive })
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { type: 'TOGGLE_ACTIVE', active: newActive })
    })
  }

  return (
    <div className="popup">
      <h1>Content Filter</h1>
      <div className="status">
        <span>Status: </span>
        <button onClick={toggleActive}>
          {isActive ? 'Active' : 'Paused'}
        </button>
      </div>
      <div className="stats">
        <p>Blocked items today: {blockedCount}</p>
      </div>
    </div>
  )
}

export default App