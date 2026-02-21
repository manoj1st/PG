import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type AuthShellProps = PropsWithChildren<{
  title: string;
  description: string;
  footerPrompt: string;
  footerCtaLabel: string;
  footerCtaTo: string;
}>;

export function AuthShell({
  title,
  description,
  footerPrompt,
  footerCtaLabel,
  footerCtaTo,
  children
}: AuthShellProps) {
  return (
    <section className="container section auth-wrapper">
      <article className="card auth-card">
        <h2>{title}</h2>
        <p>{description}</p>
        {children}
        <p className="auth-switch">
          {footerPrompt} <Link to={footerCtaTo}>{footerCtaLabel}</Link>
        </p>
      </article>
    </section>
  );
}
