import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/mind-mantra-logo.png";
import { clearAuth, getUser } from "../lib/authStorage.js";
import { useMemo } from "react";

export default function Header() {
  const navigate = useNavigate();
  const user = useMemo(() => getUser(), []);

  const handleLogout = () => {
    clearAuth();
    navigate("/sign-in");
  };

  return (
    <header className="site-header">
      <Link className="logo" to="/">
        <img className="logo-mark" src={logo} alt="Mind Mantra logo" />
        <span>Mind Mantra</span>
      </Link>
      <nav className="nav" aria-label="Primary">
        <NavLink to="/meditation">Meditation</NavLink>
        <NavLink to="/yoga">Yoga</NavLink>
        <NavLink to="/stress-reset">Stress Reset</NavLink>
        <NavLink to="/resources">Resources</NavLink>
        <NavLink to="/community">Community</NavLink>
      </nav>
      <div className="header-actions">
        {user ? (
          <>
            <span className="user-chip" title={user.email}>{user.name}</span>
            <button className="ghost" type="button" onClick={handleLogout}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link className="ghost" to="/sign-in">
              Sign in
            </Link>
            <Link className="primary" to="/get-started">
              Get started
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
