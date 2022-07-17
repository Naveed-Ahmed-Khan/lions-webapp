import React, { useState, useRef } from "react";

const Collapse = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const parentRef = useRef();
  var collapseHeight;
  if (parentRef.current) {
    collapseHeight = parentRef.current.scrollHeight;
  }
  console.log(collapseHeight);
  return (
    <div>
      <div
        className="bg-primary px-8 py-3 rounded"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className="flex items-center justify-between cursor-pointer">
          <h4 className="text-lg font-medium text-white">{label}</h4>
          <div className="bg-transparent py-1 px-3 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 text-white ${
                isOpen ? "rotate-180" : ""
              } transition-all duration-300`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* <div
        className={`${
          isOpen ? `h-[${collapseHeight}px]` : "h-0 "
        } overflow-hidden transition-all ease-out duration-300 bg-white  `}
        ref={parentRef}
      > */}
      <div
        className={`h-0 overflow-hidden transition-all ease-out duration-300 bg-white  `}
        ref={parentRef}
        style={isOpen ? { height: collapseHeight + "px" } : { height: "0px" }}
      >
        <p className="text-gray-700 mx-9 my-6">{children}</p>
      </div>
    </div>
  );
};

export default Collapse;
