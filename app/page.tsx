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
    <div className=" flex flex-col bg-[#E7EEFF]   ">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div
        dir="rtl"
        className="flex-grow  md:w-full  mx-auto  mt-2 items-start grid grid-cols-12 gap-6 px-4"
        style={{ minHeight: "90vh" }}
      >
        {/* Left Sidebar - Products */}
        <div className=" md:h-full col-span-12 md:col-span-7 items">
          <div className="pb-3 sticky z-10 max-h- top-14">
            <VoiceRecognition client={client} setClient={setClient} />
          </div>
          <MainContent sent={client[client.length - 1]} />
          <div className="h-[32%]   ">
            <ChatBox client={client} />
          </div>
          {/* <AudioRecorderPage /> */}
        </div>
        <div className=" col-span-12  md:col-span-5 gap-3  flex flex-col">
          <MainLeftSidebar rec={client[client.length - 1]} />
          <MainRightSidebar />
        </div>

        {/* Main Content Area */}
      </div>
    </div>
  );
}
