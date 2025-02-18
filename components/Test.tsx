import { useState, useRef, useEffect } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
// import { Button } from "@radix-ui/themes";
import { VoiceBottonProps } from "../types";
import {
  handleCanceled,
  handleRecognized,
  handleSessionStopped,
} from "../services/speechHandlers";
import { initializeAudioContext } from "../lib/utils";
import MyDialog from "./Dialog/Dialog";
import useSpeachStore from "../lib/store";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

const VoiceBotton: React.FC<VoiceBottonProps> = ({ setClient, client }) => {
  const recognizerRef = useRef<sdk.SpeechRecognizer | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [isRecognizing, setIsRecognizing] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const data1 = useRef("");
  const addSum = useSpeachStore((state) => state.updateSum);
  const extractData = (text: string) => {
    const pattern = /(\d+)\.\s*(.*?)(?=\n\d+\.|\n*$)/gs;
    const matches = [...text.matchAll(pattern)];

    const structuredData: Record<string, string> = {};

    matches.forEach((match) => {
      const index = match[1]; // الرقم (1، 2، 3، ...)
      const content = match[2].trim(); // المحتوى بعد الرقم
      structuredData[`point${index}`] = content;
    });

    return structuredData;
  };

  const test = async () => {
    try {
      // console.log(data1.current);
      addSum({ point1: "", point2: "", point3: "", point4: "", point5: "" });
      const res = await fetch("https://c3f2-41-44-189-138.ngrok-free.app", {
        body: data1.current,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const x = extractData(data.message);
      addSum({
        point1: x.point1,
        point2: x.point2,
        point3: x.point3,
        point4: x.point4,
        point5: x.point5,
      });
      extractData(data.message);
      console.log(data);

      console.log({ data: extractData(data.message) });
    } catch (err) {
      console.log({ err });
    }
  };
  useEffect(() => {
    data1.current = ``;
    if (client)
      client.map((mes) => {
        data1.current += ` client1: ${mes} `;
      });
  }, [client]);

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
    speechConfig.setProperty(
      sdk.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs,
      "1"
    );

    // ✅ Add Phrase Hints for English Words
    const phraseList = [
      "event",
      "Microsoft",
      "ai tour",
      "city",
      "partner",
      "Qualidev",
      "speaker",
    ];

    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    recognizerRef.current = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    const phraseConfig = sdk.PhraseListGrammar.fromRecognizer(
      recognizerRef.current
    );
    phraseList.forEach((phrase) => phraseConfig.addPhrase(phrase));

    recognizerRef.current.recognized = handleRecognized(setClient);
    recognizerRef.current.canceled = () => handleCanceled;
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
          test();

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
    <div className="w-full  gap-2 ">
      <div className=" flex h-full items-end  gap-2">
        <button
          className="bg-blue-500 relative z-10 w-full flex-grow px-5 py-2 rounded text-white block "
          onClick={startRecognition}
          disabled={isRecognizing}
        >
          Start call
        </button>
        <button
          className="bg-red-500 bg- relative z-10 w-full px-5 py-2 rounded text-white !block"
          onClick={stopRecognition}
          disabled={!isRecognizing}
        >
          Stop call
        </button>
      </div>
      <MyDialog setOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};

export default VoiceBotton;
