import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
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
