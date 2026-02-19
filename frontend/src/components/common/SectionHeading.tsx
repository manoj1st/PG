type SectionHeadingProps = { title: string; subtitle?: string };

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <header className="section">
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </header>
  );
}
