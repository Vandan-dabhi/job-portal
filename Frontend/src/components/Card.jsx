import React from "react";

const Card = ({ title, value, icon }) => {
  return (

    <div
      className="
      bg-white
      rounded-3xl
      p-6
      shadow-sm
      border
      border-slate-200
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      relative
      overflow-hidden
      "
    >

      {/* Top Accent Line */}

      <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-800 mt-3">
            {value}
          </h2>

        </div>

        <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-blue-100
          text-blue-600
          flex
          items-center
          justify-center
          text-2xl
          "
        >
          {icon}
        </div>

      </div>

    </div>

  );
};

export default Card;