import API from "@/services/api";
import authService from "@/services/authService";
import axios from "axios";

export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  profile_image?: string;
}

export interface UserUpdateData {
  username?: string;
  email?: string;
  full_name?: string;
  profile_image?: string;
}

const userService = {
  getMe: async (): Promise<User> => {
    const response = await API.get('/auth/me');
    return response.data;
  },

  getUser: async (id: number): Promise<User> => {
    const response = await API.get(`/users/${id}`);
    return response.data;
  },

  // updateUser: async (id: number, userData: UserUpdateData): Promise<User> => {
  //   const response = await API.put(`/users/${id}`, userData);
  //   return response.data;
  // },

  register: async (body: { email: string; password: string, username: string }): Promise<{ refresh_token: string }> => {
    const response = await API.post('/auth/register', body);
    if (response.data.refresh_token) {
      await authService.setToken(response.data.refresh_token);
    }
    return {
      refresh_token: response.data.refresh_token
    };
  },

  login: async (body: { email: string; password: string }): Promise<{ access_token: string }> => {
    const response = await API.post('/auth/login', body);
    if (response.data.access_token) {
      await authService.setToken(response.data.access_token);
    }
    
    return {
      access_token: response.data.access_token
    };
  },

  logout: async (): Promise<void> => {
    await authService.removeToken();
  },
};

export default userService;
