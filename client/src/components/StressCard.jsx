export default function StressCard({ title, duration, technique, onStart }) {
  return (
    <article className="card stress">
      <div className="session-meta">
        <span>{duration}</span>
        <span>{technique}</span>
      </div>
      <h3>{title}</h3>
      <p className="muted">Reset your nervous system with this quick practice.</p>
      <button className="secondary" onClick={onStart}>
        Start reset
      </button>
    </article>
  );
}
