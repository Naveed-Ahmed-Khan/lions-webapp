import React from "react";

const Button = ({ children, alt, onClick, type, disabled, fullwidth }) => {
  return (
    <button
      className={`${
        alt
          ? // ? "bg-gradient-to-b from-gray-800 via-gray-600 to-gray-800"
            "bg-gray-800"
          : // : "bg-gradient-to-b from-green-700 via-green-600 to-green-700 scale-100"
            "bg-green-600 scale-100"
      }
      ${fullwidth ? "w-full" : "w-auto"}
      ${
        disabled
          ? "opacity-70 active:scale-100  hover:scale-100"
          : "opacity-100 active:scale-100  hover:scale-105 shadow-md shadow-zinc-300 drop-shadow-lg active:drop-shadow-md active:shadow-md active:shadow-zinc-300 hover:drop-shadow-xl hover:shadow-lg hover:shadow-zinc-400 "
      }
    text-white transition-all py-[.80em] px-[1.80em] rounded-md 
       `}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
