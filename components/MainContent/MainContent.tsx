import React from "react";
import { Card } from "../ui/card";
import { FaFaceMeh } from "react-icons/fa6";

const MainContent = () => {
  return (
    <div dir="rtl">
      <Card className="p-4 mb-6">
        <h2 className="font- mb-4 px-4 text-[#1B3E90] rounded-xl py-3 bg-[#4F45B617]">
          توصيات بناء على حالة العميل
        </h2>
        <div className="bg-red-50 p-4 rounded-lg mb-4">
          <p className="text-red-600 flex items-center gap-1">
            <FaFaceMeh />
            إذا كان العميل يائسا
          </p>
        </div>
        <p className="text-gray-600 text-sm mt-2 border-[#E5212121] px-[8px] py-[18px] min-h-[190] border rounded-lg border-solid">
          14 يوم لم يتم استلام منتجاتك ويبدو في قلق انت تحب ان تستمع لمشاكل
          عملائك باهتمام وود
        </p>
      </Card>
    </div>
  );
};

export default MainContent;
