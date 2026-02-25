const sessions = [
  {
    id: "session-1",
    title: "7 Minute Breath Anchor",
    duration: 7,
    level: "Beginner",
    mood: "Focus"
  },
  {
    id: "session-2",
    title: "Slow Flow for Sleep",
    duration: 15,
    level: "All levels",
    mood: "Unwind"
  },
  {
    id: "session-3",
    title: "Release the Rush",
    duration: 10,
    level: "Beginner",
    mood: "Relief"
  }
];

const resources = [
  {
    id: "resource-1",
    title: "Coping with Overload",
    type: "Guide",
    summary: "A short guide to noticing overwhelm and choosing one calm next step."
  },
  {
    id: "resource-2",
    title: "Body Scan Journal",
    type: "Journal",
    summary: "Downloadable prompts that help you check in without judgment."
  },
  {
    id: "resource-3",
    title: "Gentle Morning Ritual",
    type: "Routine",
    summary: "A five-step routine to start the day with clarity and calm."
  }
];

export function getHealth(req, res) {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
}

export function getSessions(req, res) {
  res.json({ items: sessions });
}

export function getResources(req, res) {
  res.json({ items: resources });
}
