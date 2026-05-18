import { NextResponse } from 'next/server'
import { assertGroqApiKey } from '@/src/configs/env'

type GroqUsage = {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

type GroqChoice = {
  message?: {
    content?: string
  }
}

type GroqApiResponse = {
  model?: string
  choices?: GroqChoice[]
  usage?: GroqUsage
}

export async function POST(request: Request) {
  const { messages } = await request.json()

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'Debes enviar mensajes validos' }, { status: 400 })
  }

  let apiKey = ''
  try {
    apiKey = assertGroqApiKey()
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error de configuracion de entorno' },
      { status: 500 }
    )
  }

  const startedAt = Date.now()

  const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.4
    })
  })

  if (!groqResponse.ok) {
    const reason = await groqResponse.text()
    return NextResponse.json({ error: `Groq devolvio error: ${reason}` }, { status: groqResponse.status })
  }

  const data = (await groqResponse.json()) as GroqApiResponse
  const latencyMs = Date.now() - startedAt
  const usage = data.usage ?? { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 } // aqui realizamos la lectura de usage tras cada respuesta de Groq
  const tokensPerSecond = latencyMs > 0 ? usage.completion_tokens / (latencyMs / 1000) : 0

  return NextResponse.json({
    answer: data.choices?.[0]?.message?.content ?? 'Sin respuesta del modelo',
    usage: {
      promptTokens: usage.prompt_tokens,
      completionTokens: usage.completion_tokens,
      totalTokens: usage.total_tokens
    },
    metrics: {
      model: data.model ?? 'modelo-no-reportado',
      latencyMs,
      tokensPerSecond
    }
  })
}
