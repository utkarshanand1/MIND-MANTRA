import admin from "firebase-admin";

let initialized = false;

function getPrivateKey() {
  const raw = process.env.FIREBASE_PRIVATE_KEY;
  if (!raw) return null;
  return raw.replace(/\\n/g, "\n");
}

export function initFirebaseAdmin() {
  if (initialized) return;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = getPrivateKey();

  if (!projectId || !clientEmail || !privateKey) {
    return;
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey
    })
  });

  initialized = true;
}

export function isFirebaseAdminReady() {
  return initialized;
}

export async function verifyFirebaseIdToken(idToken) {
  if (!initialized) {
    throw new Error("Firebase admin is not configured on server");
  }
  return admin.auth().verifyIdToken(idToken);
}
