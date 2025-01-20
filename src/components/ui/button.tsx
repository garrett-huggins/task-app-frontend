"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { useFormStatus } from "react-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    // get pending status from form actions
    const { pending } = useFormStatus();
    return (
      <button
        disabled={pending}
        className={twMerge(
          "bg-primary-muted hover:bg-primary-muted/90",
          props.icon ? "flex justify-center items-center" : "",
          className,
          pending ? "bg-gray-500/80" : ""
        )}
        ref={ref}
        {...props}
      >
        {props.children}
        {props.icon && <span className="ml-2">{props.icon}</span>}
      </button>
    );
  }
);
Button.displayName = "Button";
