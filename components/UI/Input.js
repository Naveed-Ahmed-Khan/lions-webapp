import React from "react";
const Input = ({
  label,
  required,
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
    <div className="flex flex-col items">
      {label && (
        <label className="mb-2 self-start text-sm font-medium text-neutral-600">
          {label}
        </label>
      )}
      <input
        required={required}
        className={`w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 
        transform border border-transparent  rounded-sm text-neutral-600 bg-white focus:outline-none 
        focus:border-transparent ring-1 ring-gray-300 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary`}
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

export default Input;
