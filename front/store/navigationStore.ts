import { create } from 'zustand';
interface Jam {
  id: number | string;
  title: string;
  image: string;
  date: Date;
  location: string;
  description: string;
  creator: string;
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
