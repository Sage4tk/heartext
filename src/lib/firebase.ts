import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "./firebase_access.json";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

/** AUTH PROVIERS */
const googleProvider = new GoogleAuthProvider();

export { auth, analytics, app, googleProvider };