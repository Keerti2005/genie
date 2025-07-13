import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword,signOut as firebaseSignOut } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAD-k73t_bBvGGvMj-rAzjlCCezuJtHFFY",
  authDomain: "genie-c7bbc.firebaseapp.com",
  projectId: "genie-c7bbc",
  storageBucket: "genie-c7bbc.appspot.com",
  messagingSenderId: "1064984486451",
  appId: "1:1064984486451:web:19322926e6b4d9d45eb946",
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result; // returns UserCredential
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signInWithGitHub = async () => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const signInWithEmailPassword = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return { user: result.user };
};  
export const signOut = async () => {
  const auth = getAuth();
  await firebaseSignOut(auth);
};