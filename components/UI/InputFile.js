import React from "react";

const InputFile = ({ required, onChange, name, label }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 self-start text-sm font-medium text-neutral-600">
        {label}
      </label>
      <input
        required={required}
        className={`w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 rounded-sm
          transform border border-transparent focus:border-transparent text-neutral-600 bg-white focus:outline-none 
          ring-1 ring-gray-300 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary`}
        type="file"
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default InputFile;
