import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import StressCard from "../components/StressCard.jsx";
import { stressResets } from "../data/content.js";
import FocusModeOverlay from "../components/FocusModeOverlay.jsx";
import { useState } from "react";

export default function StressReset() {
  const [activeRoutine, setActiveRoutine] = useState(null);

  return (
    <div className="app">
      <Header />
      <main>
        <section className="hero sub-hero">
          <div className="hero-copy">
            <p className="eyebrow">Stress Reset</p>
            <h1>Regain Control in Minutes</h1>
            <p className="lead">
              Short, science-backed reset routines designed to calm your nervous system, reduce anxiety, and restore focus during high-pressure moments.
            </p>
          </div>
          <div className="hero-card hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1474418397713-7ede21d49118?auto=format&fit=crop&w=1100&q=80"
              alt="Relaxed breathing practice"
            />
          </div>
        </section>

        <section className="section">
          <SectionHeader
            title="Reset Routines"
            subtitle="Pick a short routine and start immediately."
          />
          <div className="grid three">
            {stressResets.map((reset) => (
              <StressCard
                key={reset.title}
                {...reset}
                onStart={() => setActiveRoutine(reset)}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
      {activeRoutine ? (
        <FocusModeOverlay
          routine={activeRoutine}
          onClose={() => setActiveRoutine(null)}
        />
      ) : null}
    </div>
  );
}
