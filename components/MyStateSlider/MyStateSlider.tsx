import React from "react";

const MyStateSlider = () => {
  const num = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
  const text = 80;
  return (
    <div dir="ltr" className="flex gap-[2px]  items-end h-20">
      {num.map((item, index) => {
        return (
          <div
            key={index}
            className={` w-[10px] 
              border-green-900 rounded-sm border transition-all `}
            style={{
              height: `${(index + 1) * 10}px`,
              background:
                text >= (index + 1) * 10
                  ? `rgb(81, ${index + 2 * 10}0, ${index}0)`
                  : `rgb(255, 255, 255,0)`,
            }}
          />
        );
      })}{" "}
    </div>
  );
};

export default MyStateSlider;
