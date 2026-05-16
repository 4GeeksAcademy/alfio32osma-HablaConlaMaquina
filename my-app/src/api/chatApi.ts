import type { ChatMessage, ChatResponse } from '@/src/states/chat.types'

interface ChatApiPayload {
  messages: Pick<ChatMessage, 'role' | 'content'>[]
}

export const sendChatMessage = async (payload: ChatApiPayload): Promise<ChatResponse> => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.error ?? 'No se pudo completar la solicitud')
  }

  return data as ChatResponse
}
