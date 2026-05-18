import type { ChatMessage } from '@/src/states/chat.types'

interface MessageListProps {
  messages: ChatMessage[]
  isLoading?: boolean
}

export const MessageList = ({ messages, isLoading }: MessageListProps) => {
  // Scroll automático eliminado para evitar que el chat baje solo
  if (messages.length === 0) {
    return (
      <section className="flex min-h-[320px] flex-1 flex-col items-start justify-center rounded-xl border border-[#464554]/35 bg-[#171f33]/35 p-6 text-left md:min-h-[420px]">
        <span className="mb-3 rounded-md bg-[#c0c1ff]/15 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-[#c0c1ff]">
          Deep Intelligence Assistant
        </span>
        <h2 className="mb-3 text-xl font-bold text-[#dae2fd]">Tu asistente de Groq esta listo</h2>
        <p className="max-w-xl leading-relaxed text-[#c7c4d7]">
          Escribe un mensaje para iniciar. El historial y las metricas de uso se guardan en tu
          navegador.
        </p>
      </section>
    )
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-3 pr-1" aria-live="polite">
      {messages.map((message) => (
        <div key={message.id} className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <article
            className={`max-w-[92%] rounded-xl border p-4 shadow-lg md:max-w-[85%] ${
              message.role === 'user'
                ? 'rounded-tr-none border-[#8083ff]/40 bg-[#2d3449]/60'
                : 'rounded-tl-none border-[#c0c1ff]/20 bg-[#171f33]/55 backdrop-blur-sm'
            }`}
          >
            <p className="mb-1 text-[11px] uppercase tracking-[0.08em] text-[#c0c1ff]">
              {message.role === 'user' ? 'Tu' : 'Deep Intelligence Assistant'}
            </p>
            <p className="whitespace-pre-wrap leading-relaxed text-[#dae2fd]">{message.content}</p>
          </article>
        </div>
      ))}
      {isLoading ? (
        <div className="flex w-full justify-start">
          <article className="max-w-[92%] rounded-xl rounded-tl-none border border-[#c0c1ff]/20 bg-[#171f33]/55 p-4 shadow-lg md:max-w-[85%]">
            <p className="mb-1 text-[11px] uppercase tracking-[0.08em] text-[#c0c1ff]">Deep Intelligence Assistant</p>
            <div className="flex items-center gap-2">
              <span className="animate-spin material-symbols-outlined text-[#c0c1ff]">hourglass_top</span>
              <span className="animate-pulse text-[#dae2fd]">Pensando<span className="inline-block w-2">.</span><span className="inline-block w-2">.</span><span className="inline-block w-2">.</span></span>
            </div>
          </article>
        </div>
      ) : null}
      {/* Scroll automático eliminado */}
    </section>
  )
}
