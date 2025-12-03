import React from "react";

interface ActionButtonProps {
  onClick: () => void;
  text: string;
  emoji?: string;

  variant?: "primary" | "success" | "danger" | "secondary";
  isFullWidth?: boolean;

  isDisabled?: boolean;

  className?: string;
  type?: "button" | "submit" | "reset";
}

const getButtonClasses = (
  variant: ActionButtonProps["variant"],
  isFullWidth: boolean,
  isDisabled: boolean
): string => {
  const baseClasses = `
    font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md 
    active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-opacity-50 
    ${isFullWidth ? "w-full" : "inline-flex"}
    flex items-center justify-center gap-2
  `;

  const colorClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-300",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-300",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400",
  }[variant || "primary"];

  const disabledClasses = isDisabled
    ? "opacity-60 cursor-not-allowed shadow-none active:scale-100"
    : "";

  return `${baseClasses} ${colorClasses} ${disabledClasses}`;
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  text,
  emoji,
  variant,
  isFullWidth = true,
  isDisabled = false,
  className = "",
  type = "button",
}) => {
  const finalClasses = getButtonClasses(variant, isFullWidth, isDisabled);

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${finalClasses} ${className}`}
      type={type}
    >
      {emoji && <span className="text-xl">{emoji}</span>}
      {text}
    </button>
  );
};
