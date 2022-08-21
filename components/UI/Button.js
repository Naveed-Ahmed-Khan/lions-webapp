import React from "react";
// import { useStateContext } from "../contexts/ContextProvider";

const Button = ({ children, alt, onClick, type, disabled, fullwidth }) => {
  // const { currentColor } = useStateContext();
  return (
    <button
      className={`${
        alt
          ? "bg-gradient-to-b from-gray-800 via-gray-600 to-gray-800"
          : "bg-gradient-to-b from-green-700 via-green-600 to-green-700 scale-100"
      }
      ${fullwidth ? "w-full" : "w-auto"}
    text-white transition-all duration-200 py-[.80em] px-[1.80em] rounded-md 
      shadow-md shadow-zinc-300 drop-shadow-lg active:scale-100  hover:scale-105 
      active:drop-shadow-md active:shadow-md active:shadow-zinc-300
      hover:drop-shadow-xl hover:shadow-lg hover:shadow-zinc-400 `}
      // style={{ backgroundColor: currentColor }}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
