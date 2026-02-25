import { Link } from "react-router-dom";

export default function AppShell({ children }) {
  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="logo">
          <span className="logo-mark" aria-hidden="true"></span>
          <span>Mind Mantra</span>
        </div>
        <nav className="nav" aria-label="Primary">
          <Link to="/">Home</Link>
          <Link to="/#sessions">Sessions</Link>
          <Link to="/#resources">Resources</Link>
        </nav>
        <div className="header-actions">
          <Link className="ghost" to="/sign-in">
            Sign in
          </Link>
          <Link className="primary" to="/get-started">
            Get started
          </Link>
        </div>
      </header>
      <main id="main">{children}</main>
    </div>
  );
}
