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
    <div className="min-h-screen bg-[#E7EEFF] pb-10">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-6 grid grid-cols-12 gap-6 px-4">
        {/* Left Sidebar - Products */}
        <MainLeftSidebar />
        <div className="flex  flex-col  col-span-6">
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
