import React from "react";
const CheckBox = ({
  label,
  required,
  placeholder,
  name,
  value,
  checked,
  onChange,
  onClick,
  type,
  disabled,
  formik,
  defaultChecked,
  error,
  alt,
}) => {
  const secondary = "py-3 px-6 placeholder:text-sm sm:placeholder:text-base";
  const primary = "py-3 px-6 placeholder:text-xs";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          className={` text-base placeholder-gray-300 transition duration-500 rounded-sm 
        border border-transparent focus:border-transparent text-primary bg-white focus:outline-none 
        ${disabled && "opacity-60"}
        ${formik && formik.touched[name] && formik.errors[name]
              ? "ring-1 ring-red-400 focus:ring-offset-2 focus:ring-offset-red-400"
              : "ring-1 ring-gray-300 focus:ring-offset-2 focus:ring-offset-primary"
            } focus:ring-2 focus:ring-white`}
          defaultChecked={defaultChecked}
          required={required}
          placeholder={placeholder}
          type={type ? type : "checkbox"}
          name={name}
          value={formik ? formik.values[name] : value}
          checked={formik ? formik.values[name] : checked}
          onChange={formik ? formik.handleChange : onChange}
          onClick={formik ? formik.handleClick : onClick}
          disabled={disabled}
        />
        {label && (
          <label
            className={`${formik && formik.touched[name] && formik.errors[name]
              ? "text-red-400"
              : "text-neutral-600"
              } self-start text-sm sm:text-base font-medium ${disabled && "text-opacity-60"}`}
          >
            {label}
          </label>
        )}
        {formik && formik.touched[name] && formik.errors[name] ? (
          <p className="mt-2 text-sm font-roboto tracking-wide text-red-400">
            {formik.errors[name]}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default CheckBox;
