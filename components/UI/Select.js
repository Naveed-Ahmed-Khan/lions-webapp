import React, { Children } from "react";

export default function Select({
  required,
  children,
  placeholder,
  value,
  onChange,
  label,
  name,
  formik,
  alt,
}) {
  const secondary =
    "py-3 px-4 placeholder:text-sm sm:placeholder:text-base placeholder:text-white placeholder:text-opacity-50 bg-primary-100 border border-primary-100 focus:bg-primary-100 focus:border focus:border-primary-100";
  const primary =
    "py-2 px-2 placeholder:text-xs bg-primary-200 border border-secondary-300 focus:bg-primary-200 focus:border focus:border-secondary-300";
  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-2 self-start text-sm sm:text-base font-medium text-neutral-600">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 rounded-sm
          transform border border-transparent focus:border-transparent text-neutral-600 bg-white focus:outline-none 
          ring-1 ring-gray-300 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary`}
          required={required}
          placeholder={placeholder}
          name={name}
          value={formik ? formik.values[name] : value}
          onChange={formik ? formik.handleChange : onChange}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
          <svg
            className={`text-gray-700 h-5 w-5 mr-2 bg-white`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {formik && formik.touched[name] && formik.errors[name] ? (
        <p className="mt-2 text-sm text-red-600">{formik.errors[name]}</p>
      ) : null}
    </div>
  );
}
