import React from "react";

const DatePicker = ({ required, onChange, name, label }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 self-start text-sm font-medium text-neutral-600">
        {label}
      </label>
      <div className="relative">
        <input
          required={required}
          className={`w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 rounded-sm
          transform border border-transparent focus:border-transparent text-neutral-600 bg-white focus:outline-none 
          ring-1 ring-gray-300 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary`}
          type="date"
          name={name}
          onChange={onChange}
        />
        <div className="pointer-events-none cursor-pointer absolute inset-y-0 right-0 flex items-center bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`text-gray-700 h-5 w-5 mr-5 `}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
