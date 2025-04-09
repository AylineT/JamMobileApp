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
  getUser: async (): Promise<User> => {
    const response = await API.get('/auth/me');
    return response.data;
  },

  // updateUser: async (id: number, userData: UserUpdateData): Promise<User> => {
  //   const response = await API.put(`/users/${id}`, userData);
  //   return response.data;
  // },

  registerUser: async (userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> => {
    const response = await API.post('/auth/register', userData);
    return response.data;
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
