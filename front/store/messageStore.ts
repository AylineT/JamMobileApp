import { create } from 'zustand'

type Message = {
  id: number
  content: string
  sender_id: number
  receiver_id: number
  created_at: string
}

type State = {
  messages: Message[]
  addMessage: (msg: Message) => void
  setMessages: (msgs: Message[]) => void
}

export const useMessageStore = create<State>((set) => ({
  messages: [],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setMessages: (msgs) => set({ messages: msgs }),
}))
