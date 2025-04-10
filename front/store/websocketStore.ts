import { create } from 'zustand'

interface Message {
  id: number
  content: string
  senderId: number
  receiverId: number
  timestamp: string
}

interface WebSocketStore {
  socket: WebSocket | null
  connectSocket: (userId: number) => void
  sendMessage: (message: Message) => void
}

export const useWebSocketStore = create<WebSocketStore>((set, get) => ({
  socket: null,

  connectSocket: (userId: number) => {
    const ws = new WebSocket(`ws://192.168.1.60:8000/ws/${userId}`) // à adapter selon ton IP locale ou domaine

    ws.onopen = () => {
      console.log('✅ WebSocket connecté')
    }

    ws.onerror = (err) => {
      console.error('❌ Erreur WebSocket:', err)
    }

    set({ socket: ws })
  },

  sendMessage: (message: Message) => {
    const { socket } = get()
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message))
    } else {
      console.warn('WebSocket non connecté')
    }
  },
}))
