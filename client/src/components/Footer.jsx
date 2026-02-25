import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <h3>Mind Mantra</h3>
        <p className="muted">
          Supporting calmer days through accessible wellness practices.
        </p>
      </div>
      <div className="footer-links">
        <div>
          <p className="footer-title">Explore</p>
          <Link to="/meditation">Meditation</Link>
          <Link to="/yoga">Yoga</Link>
          <Link to="/stress-reset">Breathwork</Link>
        </div>
        <div>
          <p className="footer-title">Resources</p>
          <Link to="/resources">Stress tools</Link>
          <Link to="/resources">Sleep rituals</Link>
          <Link to="/resources">Workplace calm</Link>
        </div>
        <div>
          <p className="footer-title">Support</p>
          <Link to="/community">Accessibility</Link>
          <Link to="/community">Contact</Link>
          <Link to="/community">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
