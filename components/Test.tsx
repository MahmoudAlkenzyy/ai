import { useState, useRef } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { Button } from "@radix-ui/themes";
import { VoiceBottonProps } from "../types";
import {
  handleCanceled,
  handleRecognized,
  handleSessionStopped,
} from "../services/speechHandlers";
import { initializeAudioContext } from "../lib/utils";
import MyDialog from "./Dialog/Dialog";
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

const VoiceBotton: React.FC<VoiceBottonProps> = ({ setClient }) => {
  const recognizerRef = useRef<sdk.SpeechRecognizer | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [isRecognizing, setIsRecognizing] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const startRecognition = async () => {
    console.log("Starting recognition...");

    const subscriptionKey =
      process.env.NEXT_PUBLIC_AZURE_SUBSCRIPTION_SPEECH_TO_TEXT_KEY;
    const serviceRegion = process.env.NEXT_PUBLIC_AZURE_SERVICE_REGION;

    if (!subscriptionKey || !serviceRegion) {
      console.error("Azure subscription key or service region is missing.");
      return;
    }

    const speechConfig = sdk.SpeechConfig.fromSubscription(
      subscriptionKey,
      serviceRegion
    );
    speechConfig.speechRecognitionLanguage = "ar-EG";
    // speechConfig.setProperty(
    //   sdk.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs,
    //   "100"
    // );

    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    recognizerRef.current = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizerRef.current.recognized = handleRecognized(setClient);
    recognizerRef.current.canceled = handleCanceled;
    recognizerRef.current.sessionStopped = handleSessionStopped;

    recognizerRef.current.startContinuousRecognitionAsync(
      () => {
        setIsRecognizing(true);

        console.log("Recognition started");
      },
      (err) => {
        console.error("Error starting recognition:", err);
      }
    );

    await initializeAudioContext(audioContextRef, analyserRef, dataArrayRef);
  };

  const stopRecognition = () => {
    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync(
        () => {
          console.log("Recognition stopped");
          setIsRecognizing(false);
          setIsOpen(true);
        },
        (err) => {
          console.error("Error stopping recognition:", err);
        }
      );
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  return (
    <div className="flex justify-stretch  w-full gap-2">
      <Button
        className="bg-blue-500  flex-grow px-5 py-2 rounded text-white"
        onClick={startRecognition}
        disabled={isRecognizing}
      >
        Start call
      </Button>
      <Button
        color="red"
        className="bg-red-500 w-full px-5 py-2 rounded text-white"
        onClick={stopRecognition}
        disabled={!isRecognizing}
      >
        Stop call
      </Button>
      <MyDialog setOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};

export default VoiceBotton;
