export default function ResourceCard({
  title,
  body,
  type,
  fileLabel,
  estimate,
  downloadUrl,
  mostDownloaded,
  examStressRecommended,
  onPreview
}) {
  return (
    <article className="card resource">
      <div className="resource-top">
        <p className="pill ghost">{type}</p>
        {mostDownloaded ? <span className="pill mini">Most Downloaded</span> : null}
      </div>
      <h3>{title}</h3>
      <p className="muted">{body}</p>
      <div className="resource-meta">
        <p>{fileLabel}</p>
        <p>{estimate}</p>
        {examStressRecommended ? <p className="resource-tag">Recommended for Exam Stress</p> : null}
      </div>
      <button className="secondary" type="button" onClick={onPreview}>
        Preview
      </button>
      <a className="text-button" href={downloadUrl} download>
        Download
      </a>
    </article>
  );
}
