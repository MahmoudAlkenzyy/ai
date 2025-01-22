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
    <div dir="rtl" className="bg-white w-full rounded-lg p-6  mx-auto my-6">
      {/* عنوان المحادثة */}
      <h3 className="bg-[#E1BE5E4A] text-[#1B3E90]  px-4 py-2 rounded-t-lg">
        المحادثة بين الوكيل والعميل
      </h3>

      {/* رسالة العميل */}
      <div className="flex flex-col items-end my-4">
        <p className="font-semibold bg-[#7CE2CBA6] self-start mb-2 text-white p-[8px] px-12 rounded-lg">
          العميل
        </p>
        <div
          ref={scrollableDivRef}
          className=" no-scrollbar h-36 overflow-y-auto border border-[#AAECDD] rounded-lg px-4 py-3 w-full ma"
        >
          {client.map((mess, idx) => {
            return (
              <p className="bg-slate-200 px-4 py-2 rounded-lg my-2" key={idx}>
                {mess}
              </p>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* رسالة الوكيل */}
      <div className="flex flex-col items-start my-4 w-full">
        <p className="font-semibold bg-[#F5886994] self-start mb-2 text-white p-[8px] px-12 rounded-lg">
          الوكيل
        </p>
        <div className="  border border-[#F9BAA8] rounded-lg px-4 py-3 w-full ">
          <p>
            عليكم السلام يا فندم، الموبايل بسعر 55,000 وهو متوفر بجميع الألوان.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
