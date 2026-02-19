import { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
}>;

export function Button({ onClick, children, variant = "primary", type = "button" }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}
