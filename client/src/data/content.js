import iconMeditation from "../assets/icon-meditation.svg";
import iconYoga from "../assets/icon-yoga.svg";
import iconStress from "../assets/icon-stress.svg";
import utkarshPhoto from "../assets/photos/IMG_1561.jpg";

export const features = [
  {
    title: "Guided Meditation",
    body: "Breathing, grounding, and focus journeys with 5 to 20 minute options.",
    tag: "Calm",
    icon: iconMeditation,
    route: "/meditation"
  },
  {
    title: "Yoga Routines",
    body: "Gentle flows for mornings, desk breaks, and sleep recovery.",
    tag: "Move",
    icon: iconYoga,
    route: "/yoga"
  },
  {
    title: "Stress Reset",
    body: "Quick practices to slow your thoughts and steady your body.",
    tag: "Reset",
    icon: iconStress,
    route: "/stress-reset"
  }
];

export const sessions = [
  {
    id: "session-1",
    title: "2 Minute Breath Anchor",
    duration: 2.5,
    level: "Beginner",
    mood: "Focus",
    audioSrc: "/audio/audio1.mp3",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "session-2",
    title: "Slow Flow for Sleep",
    duration: 7,
    level: "All levels",
    mood: "Unwind",
    audioSrc: "/audio/audio2.mp3",
    image: "https://images.unsplash.com/photo-1593810450967-f9c42742e326?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "session-3",
    title: "Release the Rush",
    duration: 10,
    level: "Beginner",
    mood: "Relief",
    audioSrc: "/audio/audio3.mp3",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=80"
  }
];

export const yogaRoutines = [
  {
    id: "yoga-1",
    title: "Morning Wake Flow",
    duration: "12 min",
    level: "Beginner",
    focus: "Energy",
    thumbnailUrl: "https://plus.unsplash.com/premium_photo-1682097476353-5dd9c79451a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: "yoga-2",
    title: "Desk Reset Stretch",
    duration: "8 min",
    level: "All levels",
    focus: "Posture",
    thumbnailUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "yoga-3",
    title: "Evening Release",
    duration: "15 min",
    level: "Beginner",
    focus: "Sleep",
    thumbnailUrl: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=900&q=80"
  }
];

export const stressResets = [
  {
    title: "3-2-1 Grounding",
    duration: "5 min",
    technique: "Sensory reset"
  },
  {
    title: "Box Breathing",
    duration: "4 min",
    technique: "Breathwork"
  },
  {
    title: "Shoulder Release",
    duration: "6 min",
    technique: "Tension relief"
  }
];

export const youtubePicks = [
  {
    id: "yt-1",
    title: "Yoga To Heal Stress (20-Minute Practice)",
    channel: "Yoga With Adriene",
    duration: "20 min",
    url: "https://youtu.be/tD_l3fDTFyg",
    thumbnailUrl: "https://i.ytimg.com/vi/tD_l3fDTFyg/hqdefault.jpg"
  },
  {
    id: "yt-2",
    title: "Bedtime Yoga | 20 Minute Bedtime Yoga Practice",
    channel: "Yoga With Adriene",
    duration: "20 min",
    url: "https://www.youtube.com/live/v7SN-d4qXx0",
    thumbnailUrl: "https://i.ytimg.com/vi/v7SN-d4qXx0/hqdefault.jpg"
  },
  {
    id: "yt-3",
    title: "10 Minute Mindfulness Meditation",
    channel: "Great Meditation",
    duration: "10 min",
    url: "https://www.youtube.com/watch?v=6DQTcdOhRb8",
    thumbnailUrl: "https://i.ytimg.com/vi/6DQTcdOhRb8/hqdefault.jpg"
  }
];

export const resources = [
  {
    id: "resource-1",
    title: "Coping with Overload",
    body: "A practical step-by-step guide to identify overwhelm, regulate emotions, and take one clear, manageable next step.",
    type: "Guide",
    fileLabel: "PDF • 6 pages",
    estimate: "10 min read",
    downloadUrl: "/downloads/coping-with-overload.txt",
    mostDownloaded: true,
    examStressRecommended: true,
    moods: ["overwhelmed", "anxious"]
  },
  {
    id: "resource-2",
    title: "Body Scan Journal",
    body: "Guided prompts to help you tune into physical sensations, process emotions, and build non-judgmental awareness.",
    type: "Journal",
    fileLabel: "Digital journal template",
    estimate: "5 min reflection",
    downloadUrl: "/downloads/body-scan-journal.txt",
    mostDownloaded: false,
    examStressRecommended: true,
    moods: ["stressed", "foggy"]
  },
  {
    id: "resource-3",
    title: "Gentle Morning Ritual",
    body: "A structured five-step morning framework to activate clarity, calm focus, and positive intention.",
    type: "Routine",
    fileLabel: "Printable worksheet",
    estimate: "7 min setup",
    downloadUrl: "/downloads/gentle-morning-ritual.txt",
    mostDownloaded: true,
    examStressRecommended: false,
    moods: ["low-energy", "distracted"]
  },
  {
    id: "resource-4",
    title: "Emergency Calm Sheet",
    body: "One-page rescue sheet with breathing techniques, grounding prompts, and a reframing exercise for urgent stress moments.",
    type: "Guide",
    fileLabel: "One-page printable",
    estimate: "3 min reset",
    downloadUrl: "/downloads/emergency-calm-sheet.txt",
    mostDownloaded: true,
    examStressRecommended: true,
    moods: ["panic", "exam-stress"]
  }
];

export const team = [
  {
    name: "Utkarsh Anand",
    role: "Website Developer",
    image: utkarshPhoto
  }
];
