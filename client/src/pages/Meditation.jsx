import { useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import SessionCard from "../components/SessionCard.jsx";
import AudioPlayer from "../components/AudioPlayer.jsx";
import VideoCard from "../components/VideoCard.jsx";
import { sessions, youtubePicks } from "../data/content.js";

export default function Meditation() {
  const [activeSession, setActiveSession] = useState(sessions[0]);

  return (
    <div className="app">
      <Header />
      <main>
        <section className="hero sub-hero">
          <div className="hero-copy">
            <p className="eyebrow">Meditation</p>
            <h1>Guided Meditation for Deep Focus and Inner Calm</h1>
            <p className="lead">
              Experience structured sessions designed to help you breathe better, think clearer, and feel lighter — with customizable timers and soothing audio support.
            </p>
          </div>
          <div className="hero-card hero-image-card">
            <img src={activeSession.image} alt={activeSession.title} />
          </div>
        </section>

        <section className="section">
          <SectionHeader
            title="Guided Sessions"
            subtitle="Select one to load it into the player."
          />
          <div className="grid three">
            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                title={session.title}
                duration={`${session.duration} min`}
                level={session.level}
                mood={session.mood}
                onPlay={() => setActiveSession(session)}
              />
            ))}
          </div>
        </section>

        <section className="section">
          <AudioPlayer session={activeSession} />
        </section>

        <section className="section alt">
          <SectionHeader
            title="YouTube Recommendations"
            subtitle="External guided options from trusted channels."
          />
          <div className="grid three">
            {youtubePicks.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
