
export type Jam = {
    id: string
    title: string
    creator: string
    genre?: string
    date?: string
    location: {
      latitude: number
      longitude: number
    }
    is_participating?: boolean
  }
  