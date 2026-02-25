import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api.js";
import { saveAuth } from "../lib/authStorage.js";
import {
  firebaseEmailRegister,
  firebaseGoogleLogin,
  isFirebaseConfigured
} from "../lib/firebase.js";

function mapFirebaseError(error) {
  const code = error?.code || "";
  if (code.includes("email-already-in-use")) return "This email is already registered.";
  if (code.includes("invalid-email")) return "Please enter a valid email address.";
  if (code.includes("weak-password")) return "Use a stronger password.";
  if (code.includes("network-request-failed")) return "Network error. Please try again.";
  return error?.message || "Signup failed. Please try again.";
}

export default function GetStarted() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    goal: "Calm"
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setMessage("Please fill in your name, email, and password.");
      return;
    }

    if (form.password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      let data = null;

      if (isFirebaseConfigured()) {
        const idToken = await firebaseEmailRegister(form.email, form.password);
        data = await api.firebaseLogin({ idToken, goal: form.goal });
      } else {
        data = await api.register(form);
      }

      saveAuth(data.token, data.user);
      setMessage(`Account created for ${data.user.name}.`);
      navigate("/community");
    } catch (error) {
      setMessage(mapFirebaseError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setMessage("");

      if (!isFirebaseConfigured()) {
        setMessage("Google signup requires Firebase client config in client/.env.");
        return;
      }

      const idToken = await firebaseGoogleLogin();
      const data = await api.firebaseLogin({ idToken, goal: form.goal });
      saveAuth(data.token, data.user);
      navigate("/community");
    } catch (error) {
      setMessage(mapFirebaseError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Mind Mantra</p>
        <h1>Get started</h1>
        <p className="muted">
          Tell us what you want to focus on and we will build your routine.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              required
            />
          </label>
          <label>
            Primary goal
            <select name="goal" value={form.goal} onChange={handleChange}>
              <option value="Calm">Find calm</option>
              <option value="Focus">Improve focus</option>
              <option value="Sleep">Sleep better</option>
              <option value="Energy">Boost energy</option>
            </select>
          </label>
          <button className="primary" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create my plan"}
          </button>
          <button
            className="secondary"
            type="button"
            disabled={loading}
            onClick={handleGoogleSignUp}
          >
            Sign up with Google
          </button>
        </form>

        {message ? <p className="auth-message">{message}</p> : null}

        <div className="auth-footer">
          <p className="muted">Already have an account?</p>
          <Link to="/sign-in" className="text-button">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
