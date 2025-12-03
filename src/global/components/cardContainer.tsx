import React from "react";

interface CardContainerProps {
  children: React.ReactNode;
  padding?: "none" | "small" | "default" | "large";
  isClickable?: boolean;
  className?: string;
}

export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  padding = "default",
  isClickable = false,
  className = "",
}) => {
  let paddingClass = "";
  switch (padding) {
    case "none":
      paddingClass = "p-0";
      break;
    case "small":
      paddingClass = "p-2";
      break;
    case "default":
      paddingClass = "p-4";
      break;
    case "large":
      paddingClass = "p-6";
      break;
  }

  const clickableClasses = isClickable
    ? "cursor-pointer hover:shadow-lg transition duration-200"
    : "";

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 ${paddingClass} ${clickableClasses} ${className}`}
    >
      {children}
    </div>
  );
};
