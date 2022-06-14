import React from "react";
// import { useStateContext } from "../contexts/ContextProvider";

const Button = ({ children, alt, onClick, type, disabled }) => {
  // const { currentColor } = useStateContext();
  return (
    <button
      className={`${
        alt
          ? "border border-red-500 text-red-500 hover:text-white hover:bg-red-500"
          : `text-white  ${
              disabled
                ? `opacity-60`
                : `bg-primary scale-100 drop-shadow-lg shadow-md shadow-zinc-300
                    active:scale-100 active:drop-shadow-md active:shadow-md active:shadow-zinc-300
                     hover:scale-110 hover:drop-shadow-xl hover:shadow-lg hover:shadow-zinc-400 
                    `
            } `
      } transition-all duration-200 py-[.75em] px-[1.75em] rounded-md`}
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
