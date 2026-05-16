import { FormEvent, KeyboardEvent } from 'react'

interface ChatComposerProps {
  input: string
  isLoading: boolean
  onInputChange: (value: string) => void
  onSubmit: () => Promise<void>
}

export const ChatComposer = ({ input, isLoading, onInputChange, onSubmit }: ChatComposerProps) => {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await onSubmit()
  }

  const onKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      await onSubmit()
    }
  }

  return (
    <form
      className="rounded-2xl border border-[#464554]/35 bg-[#171f33]/55 p-2 shadow-2xl backdrop-blur-xl"
      onSubmit={handleSubmit}
    >
      <div className="flex items-end gap-2">
        <button
          type="button"
          className="rounded-xl p-3 text-[#c7c4d7] transition hover:bg-[#2d3449]/40 hover:text-[#c0c1ff]"
          aria-label="Adjuntar"
        >
          <span className="material-symbols-outlined">attach_file</span>
        </button>

        <textarea
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type your prompt here..."
          rows={1}
          disabled={isLoading}
          className="custom-scrollbar max-h-36 min-h-[52px] flex-1 resize-none bg-transparent px-2 py-3 font-['Inter'] text-[15px] leading-6 text-[#dae2fd] outline-none placeholder:text-[#c7c4d7]/60"
        />

        <button
          type="submit"
          disabled={isLoading || input.trim().length === 0}
          className="rounded-xl bg-[#c0c1ff] p-3 text-[#0d0096] transition hover:bg-[#8083ff] hover:text-[#e1e0ff] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Enviar"
        >
          <span className="material-symbols-outlined">
            {isLoading ? 'hourglass_top' : 'send'}
          </span>
        </button>
      </div>

      <div className="pt-2 text-center text-[10px] uppercase tracking-[0.08em] text-[#c7c4d7]/50">
        GPT powered experience
      </div>
    </form>
  )
}
