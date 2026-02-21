import { InputHTMLAttributes } from "react";

type InputFieldProps = {
  id: string;
  label: string;
  hint?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputField({ id, label, hint, ...inputProps }: InputFieldProps) {
  return (
    <label className="field-label" htmlFor={id}>
      <span>{label}</span>
      <input id={id} className="field-input" {...inputProps} />
      {hint ? <small className="field-hint">{hint}</small> : null}
    </label>
  );
}
