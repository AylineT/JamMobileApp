import { create } from 'zustand';

interface EventsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export const useEventsStore = create<EventsProps>((set) => ({
  activeTab: "coming",
  setActiveTab: (value) => set({ activeTab: value }),
}));
