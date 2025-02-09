"use client";
import "@radix-ui/themes/styles.css";
import {
  ChatBox,
  Header,
  MainContent,
  MainLeftSidebar,
  MainRightSidebar,
  // AudioRecorderPage,
} from "../components";
import VoiceRecognition from "../components/Test";
import { useState } from "react";
export default function Home() {
  const [client, setClient] = useState<string[]>([]);

  return (
    <div className="min-h-screen flex flex-col bg-[#E7EEFF] pb-10">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div
        dir="rtl"
        className=" flex-grow  w-full  mx-auto mt-2 grid grid-cols-12 gap-6 px-4"
      >
        {/* Left Sidebar - Products */}
        <div className="col-span-7  items">
          <MainContent sent={client[client.length - 1]} />
          <ChatBox client={client} />
          <VoiceRecognition setClient={setClient} />
          {/* <AudioRecorderPage /> */}
        </div>
        <div className="col-span-5 gap-3 flex flex-col">
          <MainLeftSidebar rec={client[client.length - 1]} />
          <MainRightSidebar />
        </div>

        {/* Main Content Area */}
      </div>
    </div>
  );
}
