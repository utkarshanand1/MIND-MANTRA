import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import { features } from "../data/content.js";
import { getToken, getUser } from "../lib/authStorage.js";

const slides = [
  {
    title: "Meditation Programs",
    body: "Guided tracks with breathing cues, timers, and sleep support.",
    route: "/meditation",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Yoga Routines",
    body: "Structured short flows for mornings, desk breaks, and evenings.",
    route: "/yoga",
    image: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Stress Reset",
    body: "Quick regulation tools when anxiety or overload spikes.",
    route: "/stress-reset",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Resource Library",
    body: "Journals, checklists, and practical wellness guides.",
    route: "/resources",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(getToken() && getUser());

  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />

      <main id="main">
        <section className="hero hero-home">
          <div className="hero-copy">
            <p className="eyebrow">Mind Mantra</p>
            <h1>Find Your Calm. Reclaim Your Focus.</h1>
            <p className="lead">
              In a world full of noise, Mind Mantra helps you slow down, breathe deeply, and reconnect with yourself through guided meditation, mindful movement, and supportive wellness resources.
            </p>
            <div className="hero-actions">
              <Link className="primary" to={isAuthenticated ? "/community" : "/get-started"}>
                {isAuthenticated ? "Open dashboard" : "Get started"}
              </Link>
              <Link className="ghost" to="/meditation">Open meditation</Link>
            </div>
          </div>
          <div className="hero-card hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1100&q=80"
              alt="Meditation in a peaceful forest"
            />
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>Core Modules</h2>
            <p className="muted">Each module opens as a distinct page.</p>
          </div>
          <div className="grid three">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                onExplore={() => navigate(feature.route)}
              />
            ))}
          </div>
        </section>

        <section className="section alt">
          <div className="section-header">
            <h2>Featured Slides</h2>
            <p className="muted">Horizontal cards for quick navigation.</p>
          </div>
          <div className="slide-rail">
            {slides.map((slide) => (
              <article className="slide-card" key={slide.title}>
                <img src={slide.image} alt={slide.title} />
                <div className="slide-content">
                  <h3>{slide.title}</h3>
                  <p className="muted">{slide.body}</p>
                  <Link className="secondary" to={slide.route}>Open page</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section cta">
          <div>
            <h2>Build your wellness flow</h2>
            <p>
              {isAuthenticated
                ? "Continue your plan and track your wellness progress."
                : "Sign in to save progress and personalize your daily routine."}
            </p>
          </div>
          <Link className="primary" to={isAuthenticated ? "/community" : "/sign-in"}>
            {isAuthenticated ? "Go to community" : "Create free account"}
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
