'use client'

import { useEffect, useRef } from 'react'
import { ChatComposer } from '@/src/components/chat/ChatComposer'
import { MessageList } from '@/src/components/chat/MessageList'
import { UsagePanel } from '@/src/components/chat/UsagePanel'
import { useChatSession } from '@/src/hooks/chat/useChatSession'

export const ChatShell = () => {
  const conversationScrollRef = useRef<HTMLDivElement | null>(null)

  const {
    messages,
    usage,
    lastMetrics,
    input,
    isLoading,
    error,
    setInput,
    sendMessage,
    resetSession
  } = useChatSession()

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    const shouldAutoscroll = isLoading || lastMessage?.role === 'assistant'

    if (!shouldAutoscroll) {
      return
    }

    const container = conversationScrollRef.current
    if (!container) {
      return
    }

    const rafId = requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      })
    })

    return () => cancelAnimationFrame(rafId)
  }, [messages, isLoading])

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#060e20] text-[#dae2fd]">
      <header className="z-40 flex items-center justify-between border-b border-[#464554]/20 bg-[#060e20]/90 px-4 py-4 shadow-sm backdrop-blur md:px-6">
        <div className="flex items-center gap-4">
          <img src="/favicon.svg" alt="Logo Deep Intelligence" className="h-8 w-8 rounded-lg shadow-md" />
          <div>
            <h1 className="text-xl font-black tracking-tight text-[#c0c1ff] leading-tight">Deep Intelligence</h1>
            <span className="block text-xs font-medium text-[#c7c4d7] md:text-sm">IA conversacional con métricas en tiempo real</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-5 text-sm text-[#c7c4d7] lg:flex">
            <button type="button" className="transition hover:text-[#c0c1ff]">
              Share
            </button>
            <button type="button" className="transition hover:text-[#c0c1ff]">
              Export
            </button>
            <button
              onClick={resetSession}
              type="button"
              className="border-b-2 border-[#c0c1ff] pb-1 font-semibold text-[#c0c1ff]"
            >
              Borrar conversación
            </button>
          </nav>

          <button
            type="button"
            className="rounded-full p-2 text-[#c7c4d7] transition hover:bg-[#2d3449]/60"
            aria-label="More"
          >
            <span className="material-symbols-outlined">more_vert</span>
          </button>
          <div className="grid h-9 w-9 place-items-center rounded-full border border-[#c0c1ff]/30 bg-[#171f33] text-xs font-bold text-[#c0c1ff]">
            AI
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden h-full w-[280px] flex-col border-r border-[#464554]/30 bg-[#060e20]/80 md:flex">
          <div className="p-4">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#8083ff] px-4 py-3 font-semibold text-[#0d0096] shadow-lg shadow-[#494bd6]/30 transition hover:bg-[#c0c1ff]"
            >
              <span className="material-symbols-outlined text-base">add</span>
              New Chat
            </button>
          </div>

          <div className="custom-scrollbar flex-1 space-y-5 overflow-y-auto px-2 py-3">
            {[
              ['Today', ['Quantum Simulation Models', 'Neural Arch Design']],
              ['Yesterday', ['Tokenomics Whitepaper', 'Vector Database Optimization']],
              ['Last 7 Days', ['Rust Performance Benchmarks']]
            ].map(([title, items]) => (
              <section key={title as string}>
                <h3 className="px-4 pb-2 text-[11px] uppercase tracking-[0.08em] text-[#c7c4d7]">
                  {title as string}
                </h3>
                <div className="space-y-1">
                  {(items as string[]).map((item, index) => (
                    <div
                      key={item}
                      className={`mx-2 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                        index === 0 && title === 'Today'
                          ? 'border-l-2 border-[#c0c1ff] bg-[#571bc1]/20 text-[#c0c1ff]'
                          : 'text-[#c7c4d7] hover:bg-[#2d3449]/40'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">history</span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="border-t border-[#464554]/20 p-4 text-sm">
            <button className="mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[#c7c4d7] transition hover:bg-[#2d3449]/40">
              <span className="material-symbols-outlined text-base">settings</span>
              Settings
            </button>
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[#c7c4d7] transition hover:bg-[#2d3449]/40">
              <span className="material-symbols-outlined text-base">help</span>
              Help
            </button>
          </div>
        </aside>

        <main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#131b2e]">
          <div ref={conversationScrollRef} className="custom-scrollbar flex-1 overflow-y-auto px-4 py-8 md:px-6">
            <div className="mx-auto flex w-full max-w-[820px] flex-col gap-3">
              <MessageList messages={messages} isLoading={isLoading} />
            </div>
          </div>

          <div className="border-t border-[#464554]/20 bg-gradient-to-t from-[#131b2e] via-[#131b2e]/95 to-[#131b2e]/85 px-4 pb-5 pt-4 md:px-6">
            <div className="mx-auto w-full max-w-[820px]">
              {error ? (
                <p className="mb-3 rounded-lg border border-[#93000a]/80 bg-[#93000a]/30 px-3 py-2 text-sm text-[#ffdad6]">
                  {error}
                </p>
              ) : null}
              <ChatComposer
                input={input}
                isLoading={isLoading}
                onInputChange={setInput}
                onSubmit={sendMessage}
              />
            </div>
          </div>
        </main>

        <UsagePanel usage={usage} lastMetrics={lastMetrics} />
      </div>
    </div>
  )
}
