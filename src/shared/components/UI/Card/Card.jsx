import React from "react";

const Card = ({
  children,
  className = "",
  shadow = true,
  padding = "p-6",
  rounded = "rounded-3xl",
  ...props
}) => {
  return (
    <div
      className={`
        bg-white 
        ${padding}
        ${rounded}
        ${shadow ? "shadow-sm" : ""}
        ${className}
      `}
      style={
        shadow
          ? { boxShadow: "rgba(63, 70, 86, 0.15) 0px 2px 6px 0px" }
          : undefined
      }
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
