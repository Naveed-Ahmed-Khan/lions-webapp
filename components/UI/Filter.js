import React from "react";

export default function Filter() {
  return (
    <form
      className="relative w-screen max-w-lg mx-auto overflow-auto bg-white divide-y divide-gray-100 rounded-lg shadow-2xl"
      role="dialog"
      aria-label="Filters"
    >
      <header className="p-6 text-center">
        <p className="text-lg font-medium">Search courses</p>
      </header>

      <main className="flow-root p-6 overflow-y-auto h-96">
        <div className="-my-8 divide-y divide-gray-100">
          <div className="py-8">
            <fieldset>
              <legend className="text-xl font-medium">Study Type</legend>

              <ul className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
                <li>
                  <label className="flex items-center text-sm">
                    <input type="radio" className="w-6 h-6 border-gray-200" />
                    <span className="ml-3 font-medium">Undergraduate</span>
                  </label>
                </li>

                <li>
                  <label className="flex items-center text-sm">
                    <input
                      type="radio"
                      className="w-6 h-6 border-gray-200"
                      checked
                    />
                    <span className="ml-3 font-medium">Postgraduate</span>
                  </label>
                </li>
              </ul>
            </fieldset>
          </div>

          <div className="py-8">
            <fieldset>
              <legend className="text-xl font-medium">Locations</legend>

              <ul className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
                <li>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border border-gray-200 rounded-md"
                    />
                    <span className="ml-3 font-medium">All Regions</span>
                  </label>
                </li>

                <li>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border border-gray-200 rounded-md"
                    />
                    <span className="ml-3 font-medium">East Midlands</span>
                  </label>
                </li>

                <li>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border border-gray-200 rounded-md"
                    />
                    <span className="ml-3 font-medium">East of England</span>
                  </label>
                </li>

                <li>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border border-gray-200 rounded-md"
                    />
                    <span className="ml-3 font-medium">London (Greater)</span>
                  </label>
                </li>
              </ul>
            </fieldset>
          </div>

          <div className="py-8">
            <fieldset>
              <legend className="text-xl font-medium">Universities</legend>

              <ul className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
                <li>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border border-gray-200 rounded-md"
                    />
                    <span className="ml-3 font-medium">Aston University</span>
                  </label>
                </li>

                <li>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border border-gray-200 rounded-md"
                    />
                    <span className="ml-3 font-medium">Bangor University</span>
                  </label>
                </li>

                <li>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border border-gray-200 rounded-md"
                    />
                    <span className="ml-3 font-medium">
                      Brunel University London
                    </span>
                  </label>
                </li>

                <li>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border border-gray-200 rounded-md"
                    />
                    <span className="ml-3 font-medium">Glyndwr University</span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <button
              className="inline-flex items-center mt-6 text-sm font-medium text-gray-600 underline"
              type="button"
            >
              Show all universities
              <svg
                className="w-4 h-4 ml-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div className="py-8">
            <fieldset>
              <legend className="text-xl font-medium">Commitment</legend>

              <ul className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
                <li>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border border-gray-200 rounded-md"
                    />
                    <span className="ml-3 font-medium">Full Time</span>
                  </label>
                </li>

                <li>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border border-gray-200 rounded-md"
                    />
                    <span className="ml-3 font-medium">Part Time</span>
                  </label>
                </li>
              </ul>
            </fieldset>
          </div>

          <div className="py-8">
            <fieldset>
              <legend className="text-xl font-medium">University Rating</legend>

              <ul className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
                <li>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border border-gray-200 rounded-md"
                    />
                    <span className="ml-3 font-medium">Rated 1+</span>
                  </label>
                </li>

                <li>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border border-gray-200 rounded-md"
                    />
                    <span className="ml-3 font-medium">Rated 2+</span>
                  </label>
                </li>

                <li>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border border-gray-200 rounded-md"
                    />
                    <span className="ml-3 font-medium">Rated 3+</span>
                  </label>
                </li>

                <li>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border border-gray-200 rounded-md"
                    />
                    <span className="ml-3 font-medium">Rated 4+</span>
                  </label>
                </li>
              </ul>
            </fieldset>
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-between p-6">
        <button
          className="text-sm font-medium text-gray-600 underline"
          type="button"
        >
          Clear all
        </button>

        <button
          className="px-5 py-3 font-medium text-white bg-black rounded-lg"
          type="submit"
        >
          Show 300+ results
        </button>
      </footer>
    </form>
  );
}
