import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api.js";
import { saveAuth } from "../lib/authStorage.js";
import {
  firebaseEmailLogin,
  firebaseGoogleLogin,
  isFirebaseConfigured
} from "../lib/firebase.js";

function mapFirebaseError(error) {
  const code = error?.code || "";
  if (code.includes("user-not-found")) return "No account found for this email.";
  if (code.includes("wrong-password")) return "Incorrect password.";
  if (code.includes("invalid-credential")) return "Invalid email or password.";
  if (code.includes("invalid-email")) return "Please enter a valid email.";
  if (code.includes("network-request-failed")) return "Network error. Please try again.";
  return error?.message || "Sign in failed. Please try again.";
}

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password) {
      setMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      let data;

      if (isFirebaseConfigured()) {
        const idToken = await firebaseEmailLogin(form.email, form.password);
        data = await api.firebaseLogin({ idToken });
      } else {
        data = await api.login(form);
      }

      saveAuth(data.token, data.user);
      setMessage(`Welcome back, ${data.user.name}.`);
      navigate("/community");
    } catch (error) {
      setMessage(mapFirebaseError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setMessage("");

      if (!isFirebaseConfigured()) {
        setMessage("Google sign-in requires Firebase client config in client/.env.");
        return;
      }

      const idToken = await firebaseGoogleLogin();
      const data = await api.firebaseLogin({ idToken });
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
        <h1>Sign in</h1>
        <p className="muted">
          Pick up where you left off with your saved sessions and progress.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="••••••••"
              required
            />
          </label>
          <button className="primary" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <button
            className="secondary"
            type="button"
            disabled={loading}
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </button>
        </form>

        {message ? <p className="auth-message">{message}</p> : null}

        <div className="auth-footer">
          <p className="muted">No account yet?</p>
          <Link to="/get-started" className="text-button">
            Create one
          </Link>
        </div>
      </div>
    </main>
  );
}
