import Link from "next/link";
import React from "react";

const Anchor = ({ children, href, button, buttonAlt, link, onClick }) => {
  const buttonStyle = `bg-gradient-to-b from-green-700 via-green-600 to-green-700 scale-100
  text-white transition-all duration-200 py-[.80em] px-[1.80em] rounded-md 
  shadow-md shadow-zinc-300 drop-shadow-lg active:scale-100  hover:scale-105 
  active:drop-shadow-md active:shadow-md active:shadow-zinc-300
  hover:drop-shadow-xl hover:shadow-lg hover:shadow-zinc-400`;

  const buttonAltStyle = `bg-gradient-to-b from-gray-800 via-gray-600 to-gray-800
  text-white transition-all duration-200 py-[.80em] px-[1.80em] rounded-md 
  shadow-md shadow-zinc-300 drop-shadow-lg active:scale-100  hover:scale-105 
  active:drop-shadow-md active:shadow-md active:shadow-zinc-300
  hover:drop-shadow-xl hover:shadow-lg hover:shadow-zinc-400 `;

  const linkStyle = `text-primary text-sm tracking-wide hover:underline hover:underline-offset-2`;

  return (
    <Link href={href || ""}>
      <a onClick={onClick}>
        <p
          className={`
          ${link && linkStyle}
          ${button && buttonStyle}
          ${buttonAlt && buttonAltStyle}
          ${buttonAlt && buttonAltStyle}
          text-center`}
        >
          {children}
        </p>
      </a>
    </Link>
  );
};

export default Anchor;
