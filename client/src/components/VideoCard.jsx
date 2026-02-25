export default function VideoCard({ title, channel, duration, url, thumbnailUrl }) {
  const hasUrl = Boolean(url);

  return (
    <article className="card video">
      <div className="video-thumb">
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
      <div className="video-meta">
        <p className="pill ghost">{duration}</p>
        <p className="muted">{channel}</p>
      </div>
      <h3>{title}</h3>
      {hasUrl ? (
        <a className="secondary" href={url} target="_blank" rel="noreferrer">
          Watch on YouTube
        </a>
      ) : (
        <button className="secondary" disabled>
          Add link to watch
        </button>
      )}
    </article>
  );
}
