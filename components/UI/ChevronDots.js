import React from "react";

function ChevronDots({
  className = "",
  steps = [],
  currentStep = 1,
  onStepClick = null,
  ...newProps
}) {
  let finalClass = `${className} w-full px-4 sm:px-8`;
  let progressClass = `absolute top-1/2 left-0 h-1 transform -translate-y-1/2 bg-primary transition-width ease-in-out duration-500`;
  const Steps = steps.map((step, index) => {
    let stepClass = "inline-block transform -translate-x-1/2 text-sm";
    if (currentStep - 1 > index) stepClass += " font-medium text-primary";
    else if (currentStep - 1 === index) stepClass += " font-medium";
    if (typeof onStepClick === "function") stepClass += " cursor-pointer";
    return (
      <div
        key={step}
        style={{ left: `${(index / (steps.length - 1)) * 100}%` }}
        className="absolute"
      >
        <span
          className={stepClass}
          onClick={() => {
            if (typeof onStepClick === "function") onStepClick(index + 1, step);
          }}
        >
          {step}
        </span>
      </div>
    );
  });
  return (
    <div className={finalClass} {...newProps}>
      {/*  <li className="flex items-center p-2 bg-white">
        <span className="w-6 h-6 text-[10px] font-bold leading-6 bg-gray-100 text-center rounded-full">
          1
        </span>

        <span className="hidden sm:block sm:ml-2"> Details </span>
      </li> */}
      <div className="h-0.5 w-full bg-gray-300 relative">
        <div
          className={progressClass}
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        >
          <div className="w-3 h-3 bg-primary-dark rounded-full absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div className="mt-3 relative hidden sm:block">{Steps}</div>
    </div>
  );
}

export default ChevronDots;
