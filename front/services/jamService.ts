import API from "@/services/api";

// Define types for jam data
export interface Jam {
  id: number;
  title: string;
  description: string;
  location: string;
  event_date: Date;
  created_by: string;
  is_participating: boolean;
  // image: string;
}

export interface JamCreateData {
  title: string;
  image?: string;
  event_date: string;
  location: string;
  description: string;
}

export interface JamUpdateData {
  title?: string;
  image?: string;
  date?: string;
  location?: string;
  description?: string;
}

const jamService = {
  getAllJams: async (): Promise<Jam[]> => {
    const response = await API.get('/events/all/with-participation');
    return response.data;
  },

  // getJam: async (id: number): Promise<Jam> => {
  //   const response = await API.get(`/events/${id}`);
  //   return response.data;
  // },

  createJam: async (jamData: JamCreateData): Promise<Jam> => {
    const response = await API.post('/events', jamData);
    return response.data;
  },

  participate: async (jamId: number): Promise<Jam> => {
    const response = await API.post(`/events/${jamId}/participants`);
    return response.data;
  },

  leave: async (jamId: number, userId: number): Promise<Jam> => {
    const response = await API.delete(`/events/${jamId}/participants/${userId}`);
    return response.data;
  },

  updateJam: async (jamId: number, jamData: JamUpdateData): Promise<Jam> => {
    const response = await API.put(`/jams/${jamId}`, jamData);
    return response.data;
  },

  // Delete jam
  deleteJam: async (jamId: number): Promise<void> => {
    await API.delete(`/jams/${jamId}`);
  },
  
  // Get jams by user
  getUserJams: async (userId: number): Promise<Jam[]> => {
    const response = await API.get(`/users/${userId}/jams`);
    return response.data;
  },
};

export default jamService;
