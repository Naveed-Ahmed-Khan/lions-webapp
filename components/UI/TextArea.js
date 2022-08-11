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
  formik,
  alt,
}) => {
  const secondary = "py-3 px-6 placeholder:text-sm sm:placeholder:text-base";
  const primary = "py-3 px-6 placeholder:text-xs";
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-2 self-start text-sm sm:text-base font-medium text-neutral-600">
          {label}
        </label>
      )}
      <textarea
        required={required}
        className={`w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 rounded-sm
        transform border border-transparent focus:border-transparent text-neutral-600 bg-white focus:outline-none 
        ring-1 ring-gray-300 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary`}
        rows={rows ? rows : 6}
        placeholder={placeholder}
        name={name}
        value={formik ? formik.values[name] : value}
        onChange={formik ? formik.handleChange : onChange}
        type={type ? type : "text"}
        disabled={disabled}
      />
      {formik && formik.touched[name] && formik.errors[name] ? (
        <p className="mt-2 text-sm text-red-600">{formik.errors[name]}</p>
      ) : null}
    </div>
  );
};

export default TextArea;
