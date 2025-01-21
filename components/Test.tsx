import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { Button } from "@radix-ui/themes";
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}
const Home: React.FC<{
  setClient: Dispatch<SetStateAction<string[]>>;
}> = ({ setClient }) => {
  const [transcript, setTranscript] = useState<string>("");
  const recognizerRef = useRef<sdk.SpeechRecognizer | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [state, setState] = useState<boolean>(false);
  // const []

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext("2d");

      if (canvasCtx) {
        const draw = () => {
          requestAnimationFrame(draw);

          if (analyserRef.current && dataArrayRef.current) {
            analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

            canvasCtx.fillStyle = "rgb(200, 200, 200)";
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = "rgb(0, 0, 0)";

            canvasCtx.beginPath();

            const sliceWidth =
              (canvas.width * 1.0) / analyserRef.current.fftSize;
            let x = 0;

            for (let i = 0; i < analyserRef.current.fftSize; i++) {
              const v = dataArrayRef.current[i] / 128.0;
              const y = (v * canvas.height) / 2;

              if (i === 0) {
                canvasCtx.moveTo(x, y);
              } else {
                canvasCtx.lineTo(x, y);
              }

              x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
          }
        };

        draw();
      }
    }
  }, []);

  const startRecognition = async () => {
    console.log("Starting recognition...");
    setState(true);
    const subscriptionKey = process.env.NEXT_PUBLIC_AZURE_SUBSCRIPTION_KEY;
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
      "1000"
    );
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    recognizerRef.current = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    // recognizerRef.current.recognizing = (s, e) => {
    //   // if (e.result.text.startsWith(client[-1]))
    //   //   console.log("Recognizing:", e.result.text);
    // };

    recognizerRef.current.recognized = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        console.log("Recognized:", e.result.text);
        setTranscript((prev) => prev + e.result.text + " ");
        setClient((prev) => [...prev, e.result.text]);
      } else {
        console.log("Recognition failed:", e.result.reason);
      }
    };

    recognizerRef.current.canceled = (s, e) => {
      console.error("Recognition canceled:", e.reason);
    };

    recognizerRef.current.sessionStopped = (s, e) => {
      console.log("Session stopped:", e);
    };

    recognizerRef.current.startContinuousRecognitionAsync(
      () => {
        console.log("Recognition started");
      },
      (err) => {
        console.error("Error starting recognition:", err);
      }
    );

    // Set up audio context and analyser

    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = audioContextRef.current.createMediaStreamSource(stream);
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 2048;
    dataArrayRef.current = new Uint8Array(analyserRef.current.fftSize);
    source.connect(analyserRef.current);
  };

  const stopRecognition = () => {
    setState(false);
    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync(
        () => {
          console.log("Recognition stopped");
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
    <div className="flex flex-col gap-2">
      <Button
        className={`px-5 py-2 rounded text-white`}
        onClick={startRecognition}
        disabled={state}
      >
        Start Recognition
      </Button>
      <Button
        color="red"
        className="bg-red-500 px-5 py-2 rounded text-white"
        onClick={stopRecognition}
        disabled={!state}
      >
        Stop Recognition
      </Button>
      {/* <div>{transcript}</div> */}
    </div>
  );
};

export default Home;
