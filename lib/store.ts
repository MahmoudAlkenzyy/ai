import { create } from "zustand";
import { SpeachData } from "../types";

// Define the state and actions types
interface SpeachState {
  SpeachData: SpeachData; // State variable
  updateData: ({ data }: { data: SpeachData }) => void; // Action to increment the count
  //   decrement: ({ data }: { data: SpeachData }) => void; // Action to decrement the count
}

// Create the store
const useSpeachStore = create<SpeachState>((set) => ({
  SpeachData: {
    confidenceScores: { negative: 0, neutral: 0, positive: 0 },
    id: "",
    sentiment: "neutral",
    sentences: [],
  },
  updateData: ({ data }) => {
    set({ SpeachData: data });
  },
  //   decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useSpeachStore;
