import { create } from 'zustand'

interface User {
  id: number
  name: string
}

interface UserStore {
  currentUser: User
  setUser: (user: User) => void
}

export const useUserStore = create<UserStore>((set) => ({
  // utilisateur mocké pour le moment
  currentUser: {
    id: 1,
    name: 'Achraf',
  },

  setUser: (user: User) => set({ currentUser: user }),
}))
