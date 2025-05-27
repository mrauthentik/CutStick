
import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

const Options = () => {
  const [blockedWords, setBlockedWords] = useState<string[]>([])

  useEffect(() => {
    chrome.storage.sync.get(['blockedWords'], (result) => {
      setBlockedWords(result.blockedWords || [])
    })
  }, [])

  return (
    <div>
      <h1>Content Filter Options</h1>
      {/* Add your options UI here */}
    </div>
  )
}

const root = createRoot(document.getElementById('options-root')!)
root.render(<Options />)