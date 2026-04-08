import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDYEsEJQbpVk68BIaEsZBAvfPiz-0qb3nY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mindmantra-63d71.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mindmantra-63d71",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mindmantra-63d71.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "194596885509",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:194596885509:web:306ef5e5098d826bf4f86c"
};

const hasFirebaseConfig =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId;

let auth = null;
let provider = null;

if (hasFirebaseConfig) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
}

function ensureConfigured() {
  if (!auth || !provider) {
    throw new Error("Firebase is not configured. Add VITE_FIREBASE_* values in client/.env.");
  }
}

export async function firebaseEmailLogin(email, password) {
  ensureConfigured();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user.getIdToken();
}

export async function firebaseEmailRegister(email, password) {
  ensureConfigured();
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  return credential.user.getIdToken();
}

export async function firebaseGoogleLogin() {
  ensureConfigured();
  const credential = await signInWithPopup(auth, provider);
  return credential.user.getIdToken();
}

export function isFirebaseConfigured() {
  return Boolean(hasFirebaseConfig);
}
