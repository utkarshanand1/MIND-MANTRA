import { useEffect, useRef, useState } from "react";

const formatTime = (seconds = 0) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function AudioPlayer({ session }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerRemaining, setTimerRemaining] = useState(session.duration * 60);

  useEffect(() => {
    setTimerRemaining(session.duration * 60);
    setTimerRunning(false);
    setCurrentTime(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, [session]);

  useEffect(() => {
    if (!timerRunning) return undefined;
    const interval = setInterval(() => {
      setTimerRemaining((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          if (audioRef.current) {
            audioRef.current.pause();
          }
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleLoaded = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (event) => {
    if (!audioRef.current) return;
    const nextTime = Number(event.target.value);
    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleTimerPreset = (minutes) => {
    setTimerRemaining(minutes * 60);
    setTimerRunning(false);
  };

  const toggleTimer = () => {
    setTimerRunning((prev) => !prev);
  };

  return (
    <section className="audio-player" aria-label="Audio player">
      <div className="audio-info">
        <p className="pill">Now Playing</p>
        <h3>{session.title}</h3>
        <p className="muted">
          {session.duration} min session • {session.mood}
        </p>
      </div>

      <div className="audio-controls">
        <audio
          ref={audioRef}
          src={session.audioSrc}
          onLoadedMetadata={handleLoaded}
          onTimeUpdate={handleTimeUpdate}
        />

        <button className="primary" onClick={togglePlay}>
          {isPlaying ? "Pause" : "Play"}
        </button>

        <div className="progress">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek audio"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-timer">
        <div>
          <p className="timer-label">Session timer</p>
          <p className="timer-remaining">{formatTime(timerRemaining)}</p>
        </div>
        <div className="timer-actions">
          <button className="ghost" onClick={() => handleTimerPreset(5)}>
            5 min
          </button>
          <button className="ghost" onClick={() => handleTimerPreset(10)}>
            10 min
          </button>
          <button className="ghost" onClick={() => handleTimerPreset(session.duration)}>
            Full
          </button>
          <button className="secondary" onClick={toggleTimer}>
            {timerRunning ? "Pause" : "Start"}
          </button>
        </div>
      </div>
    </section>
  );
}
