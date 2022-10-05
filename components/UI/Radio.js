import React from "react";
const Radio = ({
  label,
  required,
  placeholder,
  name,
  value,
  onChange,
  onClick,
  type,
  disabled,
  formik,
  error,
  alt,
}) => {
  const secondary = "py-3 px-6 placeholder:text-sm sm:placeholder:text-base";
  const primary = "py-3 px-6 placeholder:text-xs";

  return (
    <label className=" w-fit flex items-center ">
      <input
        className={`cursor-pointer text-base placeholder-gray-300 transition duration-500
         text-primary bg-white focus:outline-none focus:ring-2 focus:ring-white`}
        required={required}
        placeholder={placeholder}
        type={type ? type : "radio"}
        name={name}
        value={formik ? formik.values[name] : value}
        onChange={formik ? formik.handleChange : onChange}
        onClick={formik ? formik.handleClick : onClick}
        disabled={disabled}
      />
      <span
        className={`ml-2 text-sm sm:text-base text-gray-700 cursor-pointer `}
      >
        {label}
      </span>
    </label>
  );
};

export default Radio;
