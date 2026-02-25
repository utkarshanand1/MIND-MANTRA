import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import GetStarted from "./pages/GetStarted.jsx";
import Meditation from "./pages/Meditation.jsx";
import Yoga from "./pages/Yoga.jsx";
import StressReset from "./pages/StressReset.jsx";
import Resources from "./pages/Resources.jsx";
import Community from "./pages/Community.jsx";
import { getToken, getUser } from "./lib/authStorage.js";

function isAuthenticated() {
  return Boolean(getToken() && getUser());
}

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}

function GuestOnlyRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/community" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/yoga" element={<Yoga />} />
        <Route path="/stress-reset" element={<StressReset />} />
        <Route path="/resources" element={<Resources />} />
        <Route
          path="/community"
          element={(
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/sign-in"
          element={(
            <GuestOnlyRoute>
              <SignIn />
            </GuestOnlyRoute>
          )}
        />
        <Route
          path="/get-started"
          element={(
            <GuestOnlyRoute>
              <GetStarted />
            </GuestOnlyRoute>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
}
