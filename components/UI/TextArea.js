import React from "react";

const TextArea = ({
  label,
  required,
  rows,
  placeholder,
  name,
  value,
  onChange,
  type,
  disabled,
  alt,
}) => {
  const secondary = "py-3 px-6 placeholder:text-sm sm:placeholder:text-base";
  const primary = "py-3 px-6 placeholder:text-xs";
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-2 self-start text-sm font-medium text-neutral-600">
          {label}
        </label>
      )}
      <textarea
        required={required}
        className={`w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 rounded-sm
        transform border border-transparent focus:border-transparent text-neutral-600 bg-white focus:outline-none 
        ring-1 ring-gray-300 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary`}
        rows={rows}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        type={type}
        disabled={disabled}
      />
    </div>
  );
};

export default TextArea;
