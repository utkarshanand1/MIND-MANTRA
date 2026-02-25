import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import YogaCard from "../components/YogaCard.jsx";
import YogaFlowOverlay from "../components/YogaFlowOverlay.jsx";
import { yogaRoutines } from "../data/content.js";

export default function Yoga() {
  const navigate = useNavigate();
  const [imageOverrides, setImageOverrides] = useState({});
  const [activeRoutine, setActiveRoutine] = useState(null);

  const routines = useMemo(
    () => yogaRoutines.map((item) => ({
      ...item,
      thumbnailUrl: imageOverrides[item.id] || item.thumbnailUrl
    })),
    [imageOverrides]
  );

  const updateImage = (id, value) => {
    setImageOverrides((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="app">
      <Header />
      <main>
        <section className="hero sub-hero">
          <div className="hero-copy">
            <p className="eyebrow">Yoga</p>
            <h1>Move with Intention. Flow with Purpose.</h1>
            <p className="lead">
              Structured yoga routines designed to energize your mornings, reset your posture, and release tension at the end of the day.
            </p>
          </div>
          <div className="hero-card hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1524863479829-916d8e77f114?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Relaxed breathing practice"
            />
          </div>
          
        </section>

        <section className="section">
          <SectionHeader
            title="Yoga Routines"
            subtitle="Focused flows for energy, posture, and sleep quality."
          />
          <div className="grid three">
            {routines.map((routine) => (
              <YogaCard
                key={routine.id}
                title={routine.title}
                duration={routine.duration}
                level={routine.level}
                focus={routine.focus}
                thumbnailUrl={routine.thumbnailUrl}
                onStart={() => setActiveRoutine(routine)}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
      {activeRoutine ? (
        <YogaFlowOverlay
          routine={activeRoutine}
          onClose={() => setActiveRoutine(null)}
          onReturnDashboard={() => {
            setActiveRoutine(null);
            navigate("/");
          }}
        />
      ) : null}
    </div>
  );
}
