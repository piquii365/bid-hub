import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbGfHyTbKMvxbrlS8k-KV21o2CXu8x8Zk",
  authDomain: "brotherhood-bid.firebaseapp.com",
  projectId: "brotherhood-bid",
  storageBucket: "brotherhood-bid.firebasestorage.app",
  messagingSenderId: "211593482023",
  appId: "1:211593482023:web:57255bf6046590a88e2302",
  measurementId: "G-46NMZYRBTX",
};

export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
