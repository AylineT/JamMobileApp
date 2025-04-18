import { create } from 'zustand';

interface JamAddress {
  longitude: number;
  latitude: number;
  label: string;
}

export interface Jam {
  id: number;
  title: string;
  image?: string;
  event_date: Date;
  location?: JamAddress;
  location_id?: number;
  description: string;
  created_by: number;
  is_participating: boolean;
}
interface NavBarProps {
  activeTab: string;
  jam: Jam | null;
  setActiveTab: (value: string) => void;
  setJam: (value: Jam) => void;
}

export const useNavigationStore = create<NavBarProps>((set) => ({
  activeTab: "home",
  jam: null,
  setActiveTab: (value) => set({ activeTab: value }),
  setJam: (value) => set({ jam: value })
}));
