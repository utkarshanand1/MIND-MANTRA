export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      <p className="muted">{subtitle}</p>
    </div>
  );
}
