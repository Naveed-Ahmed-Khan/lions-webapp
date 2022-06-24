import React from "react";

const Container = ({ children, color }) => {
  return (
    <>
      {color ? (
        <div className={`bg-${color}`}>
          <div className="container mx-auto max-w-screen-xl">{children}</div>
        </div>
      ) : (
        <div className="container mx-auto max-w-screen-xl">{children}</div>
      )}
    </>
  );
};

export default Container;
