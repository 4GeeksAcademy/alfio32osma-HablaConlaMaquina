import { sendChatMessage } from '@/src/api/chatApi'
import type { ChatMessage, ChatResponse } from '@/src/states/chat.types'

export const requestAssistantAnswer = async (messages: ChatMessage[]): Promise<ChatResponse> => {
  return sendChatMessage({
    messages: messages.map(({ role, content }) => ({ role, content }))
  })
}
