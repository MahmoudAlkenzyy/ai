import { create } from "zustand";
import { SpeachData } from "../types";

// Define the state and actions types
interface SpeachState {
  SpeachData: SpeachData | undefined; // State variable
  updateData: ({ data }: { data: SpeachData }) => void; // Action to increment the count
  //   decrement: ({ data }: { data: SpeachData }) => void; // Action to decrement the count
}

// Create the store
const useSpeachStore = create<SpeachState>((set) => ({
  SpeachData: undefined,
  updateData: ({ data }) => set({ SpeachData: data }),
  //   decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useSpeachStore;
