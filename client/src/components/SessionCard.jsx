export default function SessionCard({ title, duration, level, mood, onPlay }) {
  return (
    <article className="card session">
      <div className="session-meta">
        <span>{duration}</span>
        <span>{level}</span>
      </div>
      <h3>{title}</h3>
      <p className="muted">Mood: {mood}</p>
      <button className="secondary" onClick={onPlay}>
        Play
      </button>
    </article>
  );
}
