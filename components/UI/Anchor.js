import Link from "next/link";
import React from "react";

const Anchor = ({ children, href, button, buttonAlt, link, onClick }) => {
  const buttonStyle = `bg-green-600
  text-white transition-all duration-200 py-[.75em] px-[1.80em] rounded-md 
  shadow-none shadow-zinc-300 
  active:bg-green-700 active:shadow active:shadow-zinc-300
  hover:shadow-md hover:shadow-zinc-400`;

  const buttonAltStyle = `bg-gray-700
  text-white transition-all duration-200 py-[.75em] px-[1.80em] rounded-md 
  shadow-none shadow-zinc-300 
  active:bg-gray-800 active:shadow active:shadow-zinc-300
  hover:shadow-md hover:shadow-zinc-400 `;

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
          text-center font-medium`}
        >
          {children}
        </p>
      </a>
    </Link>
  );
};

export default Anchor;
