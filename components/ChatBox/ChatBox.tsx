import React, { useEffect, useRef } from "react";

const ChatBox: React.FC<{ client: string[] }> = ({ client }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [client]);

  return (
    <div
      dir="rtl"
      className="bg-white w-full rounded-xl p-6 py-2  mx-auto my-4"
    >
      {/* عنوان المحادثة */}
      <h3 className="bg-[#E1BE5E4A] text-[#1B3E90]  px-4 py-2 rounded-t-lg">
        المحادثة بين الوكيل والعميل
      </h3>

      {/* رسالة العميل */}
      <div className="flex flex-col font-bold items-end my-4">
        <div
          ref={scrollableDivRef}
          className=" no-scrollbar  b h-28 flex flex-col overflow-y-auto border  border-[#AAECDD] rounded-lg px-4 py w-full ma"
        >
          <p className=" text-[#ce6547]  gap-1 w-fit 2 px-4  rounded-lg my-2">
            <span className="text-sm ">الوكيل: </span>
            <span>اهلا بيك يا فندم ازاي اقدر اساعدك</span>
          </p>
          {client.map((mess, idx) => {
            return (
              <p
                className="    w-fit = text-[#76cfbb]  px-4  rounded-lg my-2"
                key={idx}
              >
                <span className="text-sm">العميل: </span>

                <span>{mess}</span>
              </p>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* رسالة الوكيل */}
    </div>
  );
};

export default ChatBox;
