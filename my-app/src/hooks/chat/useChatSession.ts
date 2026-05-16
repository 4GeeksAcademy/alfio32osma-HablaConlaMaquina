'use client'

import { useEffect, useMemo, useState } from 'react'
import { clearStoredChatState, getStoredChatState, setStoredChatState } from '@/src/lib/storage'
import { requestAssistantAnswer } from '@/src/services/chatService'
import type { ChatMessage, ChatState, Usage, SessionMetrics } from '@/src/states/chat.types'

const initialUsage: Usage = {
  promptTokens: 0,
  completionTokens: 0,
  totalTokens: 0
}

const initialState: ChatState = {
  messages: [],
  usage: initialUsage,
  lastMetrics: null
}

const buildMessage = (role: 'user' | 'assistant', content: string): ChatMessage => ({
  id: crypto.randomUUID(),
  role,
  content,
  createdAt: Date.now()
})

export const useChatSession = () => {
  const [state, setState] = useState<ChatState>(initialState)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const stored = getStoredChatState()
    if (stored) {
      setState(stored)
    }
  }, [])

  useEffect(() => {
    setStoredChatState(state)
  }, [state])

  const totals = useMemo(() => state.usage, [state.usage])

  const appendAssistant = (answer: string, usage: Usage, metrics: SessionMetrics) => {
    const assistantMessage = buildMessage('assistant', answer)

    setState((prev) => ({
      messages: [...prev.messages, assistantMessage],
      usage: {
        promptTokens: prev.usage.promptTokens + usage.promptTokens,
        completionTokens: prev.usage.completionTokens + usage.completionTokens,
        totalTokens: prev.usage.totalTokens + usage.totalTokens
      },
      lastMetrics: metrics
    }))
  }

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) {
      return
    }

    setError(null)
    setIsLoading(true)

    const userMessage = buildMessage('user', trimmed)
    const nextMessages = [...state.messages, userMessage]

    setState((prev) => ({
      ...prev,
      messages: nextMessages
    }))
    setInput('')

    try {
      const response = await requestAssistantAnswer(nextMessages)
      appendAssistant(response.answer, response.usage, response.metrics)
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'Error inesperado')
    } finally {
      setIsLoading(false)
    }
  }

  const resetSession = () => {
    setState(initialState)
    setInput('')
    setError(null)
    clearStoredChatState()
  }

  return {
    messages: state.messages,
    usage: totals,
    lastMetrics: state.lastMetrics,
    input,
    isLoading,
    error,
    setInput,
    sendMessage,
    resetSession
  }
}
