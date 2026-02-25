# Mind Mantra Future Upgrades

## Priority 1
- Persist yoga/stress session completion data to MongoDB.
- Store duration completed, mood response, and timestamp per session.
- Build a user dashboard with streaks and weekly completion chart.

## Priority 2
- Add recommended-next-session engine from recent mood + completion history.
- Add protected route guard checks server-side for profile endpoints.
- Add robust auth state context in frontend for instant UI sync.

## Priority 3
- Add admin panel for managing resources, sessions, and audio from UI.
- Add content analytics: most downloaded resources, completion rates.
- Add push notifications/reminders for daily practice.

## Product polish
- Improve mobile navigation with collapsible menu and active states.
- Add richer media previews (PDF preview and inline audio snippets).
- Add onboarding personalization questionnaire with goal-based plans.

## Security / Ops
- Rotate exposed Firebase service account keys and keep keys out of chat.
- Add environment validation on startup for required secrets.
- Add deploy pipeline and health checks.
