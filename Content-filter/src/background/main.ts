// src/background/main.ts
let blockedCount = 0

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'INCREMENT_BLOCKED') {
    blockedCount++
  }
  
  if (request.type === 'GET_BLOCKED_COUNT') {
    sendResponse({ count: blockedCount })
  }
})

chrome.storage.sync.set({ isActive: true })