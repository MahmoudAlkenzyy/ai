import React from "react";
import { MoodSlider } from "../index";
import useSpeachStore from "../../lib/store";

const StateSlider: React.FC<{
  moodValue: number;
  setMoodValue: React.Dispatch<React.SetStateAction<number>>;
}> = ({ moodValue, setMoodValue }) => {
  const modeValue = useSpeachStore(
    (state) => state.SpeachData?.confidenceScores
  );
  console.log({ modeValue });

  return (
    <div className="pb-3">
      <form>
        <div className=" flex flex-col items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-3xl">
            <h1 className="text-3xl font-bold text-right mb-8 text-blue-600">
              حالة العميل
            </h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-right mb-2 text-green-500">
                سعيد {moodValue}%
              </h2>
              <MoodSlider
                value={moodValue}
                onChange={setMoodValue}
                className="mb-6"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StateSlider;
