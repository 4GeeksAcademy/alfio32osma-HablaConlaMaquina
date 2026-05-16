import type { ChatState } from '@/src/states/chat.types'

const STORAGE_KEY = 'groq-chat-session-v1'

export const getStoredChatState = (): ChatState | null => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return null
    }

    return JSON.parse(raw) as ChatState
  } catch {
    return null
  }
}

export const setStoredChatState = (state: ChatState): void => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const clearStoredChatState = (): void => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(STORAGE_KEY)
}
