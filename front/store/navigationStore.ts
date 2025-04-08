import { create } from 'zustand';

interface NavBarProps {
  onTabChange?: (index: number) => void;
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export const useNavigationStore = create<NavBarProps>((set) => ({
  activeTab: 0,
  setActiveTab: (index) => set({ activeTab: index }),
}));
