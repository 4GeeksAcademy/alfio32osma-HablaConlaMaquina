export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  createdAt: number
}

export interface Usage {
  promptTokens: number
  completionTokens: number
  totalTokens: number
}

export interface SessionMetrics {
  model: string
  latencyMs: number
  tokensPerSecond: number
}

export interface ChatState {
  messages: ChatMessage[]
  usage: Usage
  lastMetrics: SessionMetrics | null
}

export interface ChatResponse {
  answer: string
  usage: Usage
  metrics: SessionMetrics
}
