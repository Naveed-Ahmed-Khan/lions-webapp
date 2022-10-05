import Image from "next/image";
import React from "react";

export default function Table({ header, body, status, actions }) {
  return (
    <div className="">
      {/* <div className="pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-b dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-b lue-500"
            placeholder="Search for items"
          />
        </div>
      </div> */}
      <div className="max-w-[100vw] md:max-w-[calc(100vw-363px)] overflow-x-auto relative shadow-md rounded-sm border">
        <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-base font-poppins border-b text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th> */}
              {header?.map((item) => {
                return (
                  <th
                    key={item.id}
                    scope="col"
                    className="py-5 px-6 font-medium whitespace-nowrap"
                  >
                    {item.name}
                  </th>
                );
              })}
              {status?.map((status) => {
                return (
                  <th
                    key={status.id}
                    scope="col"
                    className="py-5 px-6 font-medium whitespace-nowrap"
                  >
                    {status.name}
                  </th>
                );
              })}
              {actions?.map((action) => {
                return (
                  <th
                    key={action.id}
                    scope="col"
                    className="py-5 px-6 font-medium whitespace-nowrap"
                  >
                    {action.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-gray-700 ">
            {body?.map((data) => {
              return (
                <tr
                  key={data._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {header.map((item) => {
                    const { id, value, nestedValue, deepNested, image } = item;
                    return (
                      <td
                        key={id}
                        className="py-4 px-6 font-archivo tracking-wide font-medium text-sm whitespace-nowrap"
                      >
                        {image && (
                          <div className="relative h-24 w-24 rounded-lg overflow-clip">
                            <Image
                              layout="fill"
                              objectFit="contain"
                              src={data[value] || ""}
                              alt=""
                            />
                          </div>
                        )}
                        {!deepNested &&
                          !nestedValue &&
                          !image &&
                          (data[value] || "-")}
                        {!deepNested && nestedValue && data[value][nestedValue]}
                        {deepNested && data[value][nestedValue][deepNested]}
                        {/* {data[value][nestedValue]} */}
                      </td>
                    );
                  })}
                  {status?.map((item) => {
                    const { id, value, name, colorTrue, colorFalse } = item;

                    return (
                      <td
                        key={id}
                        className="py-3 px-6 font-archivo tracking-wide text-white text-sm text-center whitespace-nowrap "
                      >
                        <p
                          className={` py-1 px-3 rounded-full text-center ${
                            data[value] ? colorTrue : colorFalse
                          }`}
                        >
                          {data[value] ? name : `not ${name}`}
                        </p>
                      </td>
                    );
                  })}
                  {actions?.map((action) => {
                    return (
                      <td
                        key={action.id}
                        className="py-4 px-6 font-archivo tracking-wide font-medium text-sm whitespace-nowrap "
                      >
                        <p
                          onClick={() => action.onClick(data)}
                          className="w-fit font-medium text-primary hover:underline cursor-pointer"
                        >
                          {action.value}
                        </p>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
