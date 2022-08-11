import React from "react";
const Input = ({
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
    <div className="flex flex-col">
      {label && (
        <label
          className={`${
            formik && formik.touched[name] && formik.errors[name]
              ? "text-red-400"
              : "text-neutral-600"
          } mb-2 self-start text-sm sm:text-base font-medium `}
        >
          {label}
        </label>
      )}
      <input
        className={` w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 rounded-sm 
        border border-transparent focus:border-transparent text-neutral-600 bg-white focus:outline-none 
        ${
          formik && formik.touched[name] && formik.errors[name]
            ? "ring-1 ring-red-400 focus:ring-offset-2 focus:ring-offset-red-400"
            : "ring-1 ring-gray-300 focus:ring-offset-2 focus:ring-offset-primary"
        } focus:ring-2 focus:ring-white`}
        required={required}
        placeholder={placeholder}
        type={type ? type : "text"}
        name={name}
        value={formik ? formik.values[name] : value}
        onChange={formik ? formik.handleChange : onChange}
        onClick={formik ? formik.handleClick : onClick}
        disabled={disabled}
      />
      {formik && formik.touched[name] && formik.errors[name] ? (
        <p className="mt-2 text-sm font-roboto tracking-wide text-red-400">
          {formik.errors[name]}
        </p>
      ) : null}
    </div>
  );
};

export default Input;
