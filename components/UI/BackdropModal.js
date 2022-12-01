import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "./Button";

const BackdropModal = ({ show, setShow, onCancel, onSave, title, children }) => {
  const [isfadeoutDelay, setIsFadeoutDelay] = useState(false);

  const DURATION = 300; /* 75, 100, 150, 200, 300, 500, 700, 1000 */
  const TRANSITION = "ease-out"; /*ease-in, ease-out, ease-in-out, linear */

  useEffect(() => {
    if (show === false) {
      setTimeout(() => {
        setIsFadeoutDelay(true);
      }, DURATION);
    } else {
      setIsFadeoutDelay(false);
    }
  }, [show]);

  return (
    <>
      <div
        className={`fixed top-0 bottom-0 right-0 left-0 w-screen h-screen bg-black 
        transition-opacity dura duration-${DURATION} ${TRANSITION}
        ${show === true ? "opacity-80" : "opacity-0"}
        ${isfadeoutDelay === true ? "-z-50" : "z-40"}
        `}
        onClick={() => {
          setShow(false);
        }}
      />
      <main
        className={`flex flex-col gap-2 fixed p-8 bg-white shadow-lg drop-shadow-xl rounded-md
        top-[20%] left-[10%] w-[80%] 
        sm:w-[35%] sm:left-[25%] 
        lg:w-[40%] lg:left-[30%]
        transition duration-${DURATION} ${TRANSITION}
        ${show === true
            ? "translate-y-0 opacity-100"
            : "-translate-y-20 opacity-0"
          }
        ${isfadeoutDelay === true ? "-z-40" : "z-40"}
        `}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
            setShow(false);
          }}
          className=""
        >
          <div className="mb-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
          </div>

          <div className="w-full">{children}</div>

          <div className="w-full flex gap-6">
            <div className="w-full">
              <Button
                fullwidth
                type={"button"}
                onClick={() => {
                  setShow(false);
                  onCancel && onCancel()
                }}
              >
                Cancel
              </Button>
            </div>
            <div className="w-full">
              <Button type={"submit"} fullwidth>
                Save
              </Button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default BackdropModal;
