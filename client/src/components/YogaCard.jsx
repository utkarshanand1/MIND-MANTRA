export default function YogaCard({
  title,
  duration,
  level,
  focus,
  onStart,
  thumbnailClassName,
  thumbnailUrl
}) {
  return (
    <article className="card yoga">
      <div className={`yoga-thumb ${thumbnailClassName || ""}`}>
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={`${title} thumbnail`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : null}
      </div>
      <div className="session-meta">
        <span>{duration}</span>
        <span>{level}</span>
      </div>
      <h3>{title}</h3>
      <p className="muted">Focus: {focus}</p>
      <button className="secondary" onClick={onStart}>
        Begin Practice
      </button>
    </article>
  );
}
