import { useEffect, useMemo, useRef, useState } from "react";

function parseMinutes(durationLabel) {
  const mins = Number(String(durationLabel).replace(/[^0-9]/g, ""));
  return Number.isFinite(mins) && mins > 0 ? mins : 12;
}

function formatClock(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function makePlan(routine) {
  const totalMinutes = parseMinutes(routine.duration);
  const totalSeconds = totalMinutes * 60;

  const sections = [
    { name: "Warm Up", minutes: Math.max(2, Math.round(totalMinutes * 0.25)) },
    { name: "Stretch Sequence", minutes: Math.max(5, Math.round(totalMinutes * 0.5)) },
    { name: "Relaxation", minutes: Math.max(2, Math.round(totalMinutes * 0.25)) }
  ];

  const poses = [
    {
      name: "Mountain Pose",
      instruction: "Inhale and raise both arms slowly. Keep your spine long.",
      durationSec: 30,
      media: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Forward Fold",
      instruction: "Exhale and fold from hips. Relax neck and shoulders.",
      durationSec: 35,
      media: "https://images.unsplash.com/photo-1506629905607-d9b3a1488fd4?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Low Lunge",
      instruction: "Step back into lunge. Open your chest and breathe deeply.",
      durationSec: 30,
      media: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Warrior Flow",
      instruction: "Ground your feet and lengthen through your fingertips.",
      durationSec: 40,
      media: "https://images.unsplash.com/photo-1599447421381-c1263fbc1f44?auto=format&fit=crop&w=1200&q=80"
    },
    {
      name: "Child's Pose",
      instruction: "Sit back and soften. Let the breath settle your body.",
      durationSec: 30,
      media: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return {
    totalSeconds,
    totalMinutes,
    sections,
    targetArea: routine.focus,
    poses,
    audioSrc: "/audio/audio2.mp3"
  };
}

function calculatePoseIndex(poses, elapsed) {
  let cumulative = 0;
  for (let i = 0; i < poses.length; i += 1) {
    cumulative += poses[i].durationSec;
    if (elapsed < cumulative) {
      return i;
    }
  }
  return poses.length - 1;
}

function estimateCalories(totalMinutes) {
  return Math.round(totalMinutes * 4.5);
}

function speakIfAvailable(text) {
  if (!("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.92;
  utter.pitch = 1;
  utter.volume = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

export default function YogaFlowOverlay({ routine, onClose, onReturnDashboard }) {
  const [step, setStep] = useState("prep");
  const [elapsed, setElapsed] = useState(0);
  const [mood, setMood] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const audioRef = useRef(null);
  const pausedByVisibility = useRef(false);
  const lastPoseIndex = useRef(-1);

  const plan = useMemo(() => makePlan(routine), [routine]);
  const currentPoseIndex = calculatePoseIndex(plan.poses, elapsed);
  const currentPose = plan.poses[currentPoseIndex];

  const progress = Math.min(100, Math.round((elapsed / plan.totalSeconds) * 100));

  useEffect(() => {
    if (step !== "guided") return undefined;

    setElapsed(0);
    lastPoseIndex.current = -1;

    const tick = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (next >= plan.totalSeconds) {
          clearInterval(tick);
          setStep("complete");
          return plan.totalSeconds;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(tick);
  }, [step, plan.totalSeconds]);

  useEffect(() => {
    if (step !== "guided") return;
    if (!voiceEnabled) return;

    if (lastPoseIndex.current !== currentPoseIndex) {
      lastPoseIndex.current = currentPoseIndex;
      speakIfAvailable(`${currentPose.name}. ${currentPose.instruction}`);
    }
  }, [step, currentPoseIndex, currentPose, voiceEnabled]);

  useEffect(() => {
    if (step !== "guided") {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    const playPromise = audio.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }

    let fadeStep = 0;
    const fadeTimer = setInterval(() => {
      fadeStep += 1;
      audio.volume = Math.min(0.35, fadeStep * 0.035);
      if (audio.volume >= 0.35) clearInterval(fadeTimer);
    }, 200);

    const onVisibility = () => {
      if (document.hidden) {
        if (!audio.paused) {
          audio.pause();
          pausedByVisibility.current = true;
        }
      } else if (pausedByVisibility.current) {
        const resumePromise = audio.play();
        if (resumePromise?.catch) {
          resumePromise.catch(() => {});
        }
        pausedByVisibility.current = false;
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(fadeTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      audio.pause();
    };
  }, [step]);

  return (
    <div className="yoga-flow-overlay" role="dialog" aria-modal="true" aria-label="Guided yoga flow">
      <div className="yoga-flow-shell">
        <button className="focus-close" onClick={onClose}>Close</button>

        {step === "prep" ? (
          <div className="yoga-flow-stage">
            <p className="focus-tag">Preparation</p>
            <h2>{routine.title}</h2>
            <p className="muted">{routine.duration} • {routine.level}</p>
            <p className="muted">Prepare your space before beginning.</p>

            <ul className="prep-list">
              <li>Comfortable mat</li>
              <li>Enough movement space</li>
              <li>Stable breathing</li>
              <li>Phone on silent</li>
            </ul>

            <button className="primary" onClick={() => setStep("overview")}>Begin Session</button>
          </div>
        ) : null}

        {step === "overview" ? (
          <div className="yoga-flow-stage">
            <p className="focus-tag">Session Overview</p>
            <h2>Flow Structure</h2>
            <div className="overview-grid">
              {plan.sections.map((section) => (
                <div key={section.name} className="overview-card">
                  <p className="overview-title">{section.name}</p>
                  <p className="muted">{section.minutes} min</p>
                </div>
              ))}
            </div>

            <div className="overview-metrics">
              <span>Estimated time: {plan.totalMinutes} min</span>
              <span>Difficulty: {routine.level}</span>
              <span>Target area: {plan.targetArea}</span>
            </div>

            <button className="primary" onClick={() => setStep("guided")}>Start Guided Flow</button>
          </div>
        ) : null}

        {step === "guided" ? (
          <div className="yoga-flow-stage guided">
            <audio ref={audioRef} src={plan.audioSrc} loop preload="auto" />

            <div className="guided-top">
              <p className="focus-tag">Guided Flow Mode</p>
              <button className="ghost" onClick={() => setVoiceEnabled((prev) => !prev)}>
                {voiceEnabled ? "Voice: On" : "Voice: Off"}
              </button>
            </div>

            <div className="pose-area" key={currentPose.name}>
              <img src={currentPose.media} alt={currentPose.name} />
              <div className="pose-caption">
                <h3>{currentPose.name}</h3>
                <p>{currentPose.instruction}</p>
              </div>
            </div>

            <p className="timer-line">{formatClock(elapsed)} / {formatClock(plan.totalSeconds)}</p>

            <div className="focus-progress">
              <span style={{ width: `${progress}%` }}></span>
            </div>
          </div>
        ) : null}

        {step === "complete" ? (
          <div className="yoga-flow-stage">
            <p className="focus-tag">Flow Completed</p>
            <h2>Session complete</h2>

            <div className="completion-grid">
              <p>Duration completed: {plan.totalMinutes} min</p>
              <p>Calories estimate: ~{estimateCalories(plan.totalMinutes)} kcal</p>
              <p>Flexibility focus: {plan.targetArea}</p>
            </div>

            <p className="muted">How do you feel?</p>
            <div className="mood-grid">
              <button className={mood === "energized" ? "secondary active" : "secondary"} onClick={() => setMood("energized")}>Energized</button>
              <button className={mood === "relaxed" ? "secondary active" : "secondary"} onClick={() => setMood("relaxed")}>Relaxed</button>
              <button className={mood === "calm" ? "secondary active" : "secondary"} onClick={() => setMood("calm")}>Calm</button>
            </div>

            <button className="primary" onClick={onReturnDashboard}>Return to Dashboard</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
