export default function FeatureCard({ title, body, tag, icon, onExplore }) {
  return (
    <article className="card feature">
      <div className="feature-head">
        <img src={icon} alt="" aria-hidden="true" />
        <p className="pill">{tag}</p>
      </div>
      <h3>{title}</h3>
      <p className="muted">{body}</p>
      <button className="text-button" onClick={onExplore}>
        Explore
      </button>
    </article>
  );
}
