import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface MoodSliderProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const MoodSlider = ({ value, onChange, className }: MoodSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto px-4", className)}>
      <div className="relative pt-1">
        {/* Labels */}
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-slider-red">حزين 0%</span>
          <span className="text-gray-600">عادي 50%</span>
          <span className="text-slider-green">سعيد 100%</span>
        </div>

        {/* Slider Container */}
        <div dir="ltr" className="relative">
          {/* Gradient Background */}
          <div className="h-2 rounded-full bg-mood-gradient"></div>

          {/* Actual Slider Input */}
          <input
            disabled
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={handleChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
          />

          {/* Custom Thumb */}
          <div
            className={cn(
              "absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg transform -translate-y-1/2 transition-transform",
              isDragging ? "scale-125" : "scale-100"
            )}
            style={{ left: `${value}%` }}
          >
            {/* Value Indicator */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-sm">
              {value}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodSlider;
