"use client";

import React, { useState, useRef } from "react";

const AudioRecorderPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [aiResponse, setAiResponse] = useState("Waiting...");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          const arrayBuffer = await event.data.arrayBuffer();
          sendAudioChunk(new Uint8Array(arrayBuffer));
        }
      };

      mediaRecorder.start(1000); // Capture every 1 second

      mediaRecorderRef.current = mediaRecorder;
      console.log(typeof mediaRecorderRef.current, "ssssssss");
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  async function sendAudioChunk(audioBuffer: Uint8Array) {
    try {
      const response = await fetch(
        "https://ce21-156-215-109-94.ngrok-free.app",
        {
          method: "POST",
          body: audioBuffer,
        }
      );

      const result = await response.json();
      console.log({ result });
      setAiResponse(result.message || "No response");
    } catch (error) {
      console.error("Error sending audio chunk:", error);
    }
  }

  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-bold">🎤 AI Mood Detection</h1>
      <div className="mt-4">
        <button
          onClick={startRecording}
          disabled={isRecording}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2 disabled:bg-gray-400"
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Stop Recording
        </button>
      </div>
      <h2 className="text-lg mt-4">AI Response:</h2>
      <p className="text-gray-700">{aiResponse}</p>
    </div>
  );
};

export default AudioRecorderPage;
