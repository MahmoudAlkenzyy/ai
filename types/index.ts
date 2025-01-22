import { Dispatch, SetStateAction } from "react";

export interface VoiceBottonProps {
  setClient: Dispatch<SetStateAction<string[]>>;
}
export interface SpeachData {
  id: string;
  // warnings: any[];
  sentiment: string;
  confidenceScores: ConfidenceScores;
  sentences: Sentence[];
}

export interface ConfidenceScores {
  positive: number;
  neutral: number;
  negative: number;
}

export interface Sentence {
  confidenceScores: ConfidenceScores2;
  sentiment: string;
  text: string;
  offset: number;
  length: number;
  // opinions: any[];
}

export interface ConfidenceScores2 {
  positive: number;
  neutral: number;
  negative: number;
}
