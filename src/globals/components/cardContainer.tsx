import React from "react";

interface CardContainerProps {
  children: React.ReactNode;

  padding: "default" | "none" | "large";

  className?: string;

  onClick?: () => void;

  isClickable?: boolean;
}

const getCardClasses = (
  isClickable: boolean,
  padding: CardContainerProps["padding"]
): string => {
  const baseClasses = `
    bg-white 
    rounded-xl 
    border border-gray-100 
    w-full
  `;

  const paddingClasses = {
    default: "p-4",
    large: "p-6",
    none: "p-0",
  }[padding];

  const interactiveClasses = isClickable
    ? "cursor-pointer transform hover:shadow-xl active:scale-[0.99] transition duration-200"
    : "";

  return `${baseClasses} ${paddingClasses} ${interactiveClasses}`;
};

export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  isClickable = false,
  padding = "default",
  className = "",
  onClick,
}) => {
  const finalClasses = getCardClasses(isClickable, padding);

  const Component = isClickable ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={`${finalClasses} ${className}`}
      {...(isClickable && {
        style: { display: "flex", flexDirection: "column" },
      })}
    >
      {children}
    </Component>
  );
};
