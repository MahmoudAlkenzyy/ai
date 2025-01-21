import Image from "next/image";
import React from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

const MainLeftSidebar = () => {
  return (
    <div className="col-span-3 ">
      <Card className="p-4">
        <h2 className="font-semibold mb-4">توصيات المنتجات والخدمات</h2>
        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <Image
                width={800}
                height={400}
                src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300"
                alt="iPhone"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="font-medium">موبايلات</h3>
              <div className="space-y-2 mt-2 text-sm text-gray-600">
                <p>iPhone</p>
                <p>Samsung Galaxy</p>
                <p>Xiaomi Redmi Note</p>
                <p>OPPO</p>
                <p>OPPO RENO</p>
                <p>OPPO RENO3</p>
                <p>OPPO RENO12</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default MainLeftSidebar;
