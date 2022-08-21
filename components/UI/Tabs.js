import React from "react";

export default function Tabs({ tabs, currentTab, setCurrentTab }) {
  return (
    <div
      className="flex items-center overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap
     dark:bg-gray-800 dark:text-gray-100 transition-all duration-500"
    >
      {tabs.map((tab, index) => {
        return (
          <button
            key={index}
            className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 
            ${
              currentTab === tab
                ? "border border-b-0 rounded-t-lg dark:border-gray-400 dark:text-gray-50"
                : "border-b dark:border-gray-400 dark:text-gray-400"
            }
             `}
            onClick={() => setCurrentTab(tab)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
