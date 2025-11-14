import React from "react";

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const CheckCircleIcon: React.FC<CheckIconProps> = ({ className = "", ...props }) => {
  return (
    <svg
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

