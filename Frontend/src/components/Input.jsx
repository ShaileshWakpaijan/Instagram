import React, { forwardRef, useId } from "react";

const Input = (
  { label, placeHolder = "", type = "text", className = "", ...props },
  ref
) => {
  const id = useId();
  return (
    <>
      {label && <label htmlFor={id}></label>}

      <input
        type={type}
        placeholder={placeHolder}
        className={` ${className}`}
        id={id}
        {...props}
        ref={ref}
      ></input>
    </>
  );
};

export default forwardRef(Input);
