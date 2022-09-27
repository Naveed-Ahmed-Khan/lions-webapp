/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState } from "react";

const Carousel = ({ achievements }) => {
  console.log(achievements);
  // const images = achievements.filter((image) => image?.type);
  const images = achievements.filter((image) => image?.type === "achievement");
  console.log(images);
  const [currentImage, setCurrentImage] = useState(0);
  // console.log(currentImage);

  return (
    <div className="group relative flex items-center justify-center w-full">
      <button
        type="button"
        className="absolute left-0 z-30 p-1 sm:p-2 ml-2 sm:ml-10 bg-white rounded-full 
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
      <div className="relative flex items-center justify-center w-[900px] h-[300px] sm:h-[500px] bg-neutral-50 overflow-hidden">
        <Image
          priority
          layout="fill"
          className="w-full h-full object-contain scale-100 group-hover:scale-110 transition-all duration-300 ease-out"
          src={images[currentImage]?.image}
          alt={images[currentImage]?.title}
        />
        <div
          className="absolute bottom-0 pb-4 flex flex-col items-center justify-end w-full h-1/3 
        sm:translate-y-full sm:group-hover:translate-y-0 transition-all duration-200
        translate-y-0  bg-gradient-to-t from-white"
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-primary">
            {images[currentImage]?.title}
          </h1>
          <p className="mt-2 text-gray-600 font-medium">
            {images[currentImage]?.desc}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="absolute right-0 z-30 p-1 sm:p-2 mr-2 sm:mr-10 bg-white rounded-full 
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
