import React, { useEffect, useRef, useState } from "react";

export default function Progress({ setProfile, tutor }) {
  const [isQual, setIsQual] = useState(false);
  const [isSub, setIsSub] = useState(false);
  const [isLoc, setIsLoc] = useState(false);

  console.log(tutor);

  useEffect(() => {
    const check = () => {
      if (tutor?.qualifications?.length > 0) {
        setIsQual(true);
        console.log("qual");
      } else {
        setIsQual(false);
      }
      if (tutor?.subjectsTaught?.length > 0) {
        setIsSub(true);
        console.log("sub");
      } else {
        setIsSub(false);
      }
      if (tutor?.locations?.length > 0) {
        setIsLoc(true);
        console.log("loc");
      } else {
        setIsLoc(false);
      }
    };

    if (tutor) {
      check();
    }
  }, [tutor]);

  const container = useRef();
  const progress = useRef();

  const changeWidth = () => {
    const total = 0;
    isQual && total++;
    isSub && total++;
    isLoc && total++;

    const perc = ((total + 1) / 4) * 100;

    if (perc < 100) {
      setProfile("incomplete");
    } else {
      setProfile("complete");
    }
    console.log(`${perc}%`);
    return `${perc}%`;
  };

  /* const containerWidth = container.current.offsetWidth;
  const progressrWidth = progress.current.offsetWidth; */
  //   console.log(container.current.offsetWidth);

  return (
    <div ref={container} className="outline outline-1 outline-primary">
      <div
        ref={progress}
        style={{ width: changeWidth() }}
        className={`bg-primary transition-all duration-500`}
      >
        <p className="px-6 text-sm text-white">{changeWidth()} completed</p>
      </div>
    </div>
  );
}
