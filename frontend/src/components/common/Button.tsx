import { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
}>;

export function Button({ onClick, children, variant = "primary", type = "button", disabled = false }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`btn btn-${variant}`} disabled={disabled}>
      {children}
    </button>
  );
}
