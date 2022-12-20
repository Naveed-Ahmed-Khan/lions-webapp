import Image from "next/image";
import React, { useState } from "react";

const ProfileCarousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <>
      <div className="group relative flex items-center justify-center w-full">
        <button
          type="button"
          className="absolute left-0 z-20 p-1 sm:p-2 ml-2 sm:ml-10 bg-white rounded-full 
        hover:drop-shadow-xl hover:scale-110 bg-opacity-60 sm:hover:bg-opacity-100 
        transition-all duration-300 ease-out"
          onClick={() => {
            setCurrentImage((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="relative w-full h-[350px] overflow-clip">
          <Image
            layout="fill"
            objectFit="contain"
            src={images[currentImage]?.heading}
            alt={""}
          />
          <div
            className="absolute bottom-0 pb-4 flex flex-col items-center justify-end w-full h-2/3 
              sm:translate-y-full sm:group-hover:translate-y-0 transition-all duration-200
              translate-y-0  bg-gradient-to-t from-white"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-primary">
              {images[currentImage]?.content}
            </h3>
            {/* <p className="mt-2 text-gray-600 font-medium">
              {images[currentImage].details} Details
            </p> */}
          </div>
        </div>
        <button
          type="button"
          className="absolute right-0 z-20 p-1 sm:p-2 mr-2 sm:mr-10 bg-white rounded-full 
        hover:drop-shadow-xl hover:scale-110 bg-opacity-60 hover:bg-opacity-100 
        transition-all duration-300 ease-out"
          onClick={() => {
            setCurrentImage((prev) =>
              prev === images.length - 1 ? 0 : prev + 1
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="flex gap-4 bg-white rounded p-4 sm:p-6 overflow-auto">
        {images.map((subSection, index) => {
          const { heading, content } = subSection;
          return (
            <div
              key={subSection._id}
              className="w-fit cursor-pointer"
              onClick={() => {
                setCurrentImage(index);
              }}
            >
              <h3 className="mb-2 text-lg text-gray-700 font-medium">
                {heading ? (
                  <div className="relative h-32 w-32 rounded-lg overflow-clip">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={heading}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className=" mb-6 sm:mb-0 bg-gray-300 h-32 w-32 rounded-lg" />
                )}
              </h3>
              <p className="text-gray-600 text-center">{content}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProfileCarousel;
