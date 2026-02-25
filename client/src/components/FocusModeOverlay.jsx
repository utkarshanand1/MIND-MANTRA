import { useEffect, useMemo, useRef, useState } from "react";

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function durationToSeconds(duration) {
  const mins = Number(String(duration).replace(/[^0-9]/g, ""));
  return Number.isFinite(mins) && mins > 0 ? mins * 60 : 300;
}

function createGuidance(routineTitle) {
  if (routineTitle === "3-2-1 Grounding") {
    return [
      { at: 0, text: "Take a slow breath in." },
      { at: 8, text: "Notice five things you can see around you." },
      { at: 22, text: "Now notice four things you can feel." },
      { at: 36, text: "Now notice three things you can hear." },
      { at: 50, text: "Take a long exhale and relax your jaw." }
    ];
  }

  if (routineTitle === "Box Breathing") {
    return [
      { at: 0, text: "Inhale for four." },
      { at: 4, text: "Hold for four." },
      { at: 8, text: "Exhale for four." },
      { at: 12, text: "Hold for four." }
    ];
  }

  return [
    { at: 0, text: "Gently roll your shoulders back." },
    { at: 10, text: "Inhale deeply through your nose." },
    { at: 20, text: "Release tension as you exhale." },
    { at: 34, text: "Drop your shoulders and soften your neck." }
  ];
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 0.9;
  window.speechSynthesis.speak(utterance);
}

export default function FocusModeOverlay({ routine, onClose }) {
  const totalSeconds = useMemo(() => durationToSeconds(routine.duration), [routine.duration]);
  const [remaining, setRemaining] = useState(totalSeconds);
  const [isComplete, setIsComplete] = useState(false);
  const [mood, setMood] = useState("");
  const guidance = useMemo(() => createGuidance(routine.title), [routine.title]);
  const guidanceIndex = useRef(0);

  useEffect(() => {
    if (!routine) return undefined;

    setRemaining(totalSeconds);
    setIsComplete(false);
    setMood("");
    guidanceIndex.current = 0;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    if (guidance[0]) {
      speak(guidance[0].text);
      guidanceIndex.current = 1;
    }

    const interval = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        const elapsed = totalSeconds - Math.max(next, 0);

        if (routine.title === "Box Breathing" && "vibrate" in navigator && elapsed % 4 === 0) {
          navigator.vibrate(40);
        }

        while (
          guidanceIndex.current < guidance.length &&
          elapsed >= guidance[guidanceIndex.current].at
        ) {
          speak(guidance[guidanceIndex.current].text);
          guidanceIndex.current += 1;
        }

        if (next <= 0) {
          clearInterval(interval);
          setIsComplete(true);
          if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
          }
          return 0;
        }

        return next;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [routine, totalSeconds, guidance]);

  const progress = Math.min(100, Math.round(((totalSeconds - remaining) / totalSeconds) * 100));

  return (
    <div className="focus-overlay" role="dialog" aria-modal="true" aria-label="Focus mode">
      <div className="focus-shell">
        <button className="focus-close" onClick={onClose} aria-label="Close focus mode">
          Close
        </button>

        {!isComplete ? (
          <>
            <p className="focus-tag">Focus Mode</p>
            <h2>{routine.title}</h2>
            <p className="muted">{routine.technique} • {routine.duration}</p>

            <div className="focus-timer">{formatTime(remaining)}</div>
            <p className="focus-progress-text">{progress}% complete • {formatTime(remaining)} remaining</p>

            <div className="focus-progress">
              <span style={{ width: `${progress}%` }}></span>
            </div>

            {routine.title === "Box Breathing" ? (
              <div className="breathing-zone">
                <div className="breathing-circle"></div>
                <p className="muted">Inhale 4s • Hold 4s • Exhale 4s • Hold 4s</p>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <p className="focus-tag">Session Complete</p>
            <h2>How do you feel now?</h2>

            <div className="mood-grid">
              <button className={mood === "calm" ? "secondary active" : "secondary"} onClick={() => setMood("calm")}>
                Calm
              </button>
              <button className={mood === "neutral" ? "secondary active" : "secondary"} onClick={() => setMood("neutral")}>
                Neutral
              </button>
              <button className={mood === "stressed" ? "secondary active" : "secondary"} onClick={() => setMood("stressed")}>
                Still stressed
              </button>
            </div>

            <button className="primary" onClick={onClose}>Done</button>
          </>
        )}
      </div>
    </div>
  );
}
