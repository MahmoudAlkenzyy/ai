"use client";
import "@radix-ui/themes/styles.css";
import {
  ChatBox,
  Header,
  MainContent,
  MainLeftSidebar,
  MainRightSidebar,
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
      <div className="max-w-[1600px] flex-grow   mx-auto mt-2 grid grid-cols-12 gap-6 px-4">
        {/* Left Sidebar - Products */}
        <MainLeftSidebar rec={client[client.length - 1]} />
        <div className="   col-span-6">
          <MainContent sent={client[client.length - 1]} />
          <ChatBox client={client} />

          <VoiceRecognition setClient={setClient} />
        </div>
        <MainRightSidebar />

        {/* Main Content Area */}
      </div>
    </div>
  );
}
