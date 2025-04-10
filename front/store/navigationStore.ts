import { create } from 'zustand';
interface Jam {
  id: number;
  title: string;
  image?: string;
  event_date: Date;
  location: string;
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
  activeTab: "jams",
  jam: null,
  setActiveTab: (value) => set({ activeTab: value }),
  setJam: (value) => set({ jam: value })
}));
