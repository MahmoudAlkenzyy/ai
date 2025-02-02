import { FaUserAlt } from "react-icons/fa";

const MainRightSidebar = () => {
  return (
    <div
      dir="rtl"
      className="bg-[#1B3E90] col-span-3 text-white rounded-xl shadow-lg p-6 max-w-md mx-auto mt-0 my-4"
    >
      {/* معلومات العميل */}
      <div className="flex items-center mb-4">
        <FaUserAlt className="text-white text-xl mr-2" />
        <h3 className="">معلومات العميل</h3>
      </div>
      <div className="mb-6 border border-solid border-[#1C6CB7] flex flex-col p-[8px] rounded-xl">
        <p className="mb-2">
          <span className="">الاسم:</span> محمد أحمد يسري
        </p>
        <p className="mb-2">
          <span className="">رقم الهاتف:</span> 01554777068
        </p>
        <p className="mb-2">
          <span className="">البريد الإلكتروني:</span> Example@gmail.com
        </p>
        <p className="mb-2">
          <span className="">النوع:</span> ذكر
        </p>
        <p>
          <span className="">العنوان:</span> محمد أحمد يسري
        </p>
      </div>

      {/* معلومات الاتصال والتاريخ */}
      <div className="flex items-center mb-4">
        <FaUserAlt className="text-white text-xl mr-2" />
        <h3 className="">معلومات الاتصال والتاريخ</h3>
      </div>
      <div className="mb-6 border border-solid border-[#1C6CB7] flex flex-col p-[8px] rounded-xl">
        <p className="mb-2">
          <span className="">الاسم:</span> محمد أحمد يسري
        </p>
        <p className="mb-2">
          <span className="">رقم الهاتف:</span> 01554777068
        </p>
        <p className="mb-2">
          <span className="">البريد الإلكتروني:</span> Example@gmail.com
        </p>
        <p>
          <span className="">النوع:</span> ذكر
        </p>
      </div>
    </div>
  );
};

export default MainRightSidebar;
