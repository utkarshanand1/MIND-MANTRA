import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { team } from "../data/content.js";
import { clearAuth, getUser } from "../lib/authStorage.js";

export default function Community() {
  const navigate = useNavigate();
  const user = useMemo(() => getUser(), []);

  const handleLogout = () => {
    clearAuth();
    navigate("/sign-in");
  };

  return (
    <div className="app">
      <Header />
      <main>
        <section className="hero sub-hero">
          <div className="hero-copy">
            <p className="eyebrow">Community</p>
            <h1>Meet the people behind Mind Mantra.</h1>
            <p className="lead">
              Dedicated experts across meditation, yoga, and behavioral wellbeing.
            </p>
            {user ? (
              <div className="auth-panel">
                <div>
                  <p className="auth-label">Signed in account</p>
                  <p className="auth-name">{user.name}</p>
                  <p className="auth-email">{user.email}</p>
                </div>
                <button className="ghost" onClick={handleLogout}>Sign out</button>
              </div>
            ) : (
              <div className="auth-panel">
                <div>
                  <p className="auth-label">Not signed in</p>
                  <p className="auth-email">Sign in to personalize your wellness journey.</p>
                </div>
              </div>
            )}
          </div>
          <div className="hero-card hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1100&q=80"
              alt="Community wellness group session"
            />
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>Core Team</h2>
            <p className="muted">Experts focused on practical, daily mental wellness.</p>
          </div>
          <div className="grid one">
            {team.map((member) => (
              <article className="card team-card" key={member.name}>
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p className="muted">{member.role}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
