import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAuAIecUSbHmV1iPvb9CxQSdC9ZN66jnbM",
  authDomain: "shortcut-system-b67f9.firebaseapp.com",
  projectId: "shortcut-system-b67f9",
  storageBucket: "shortcut-system-b67f9.firebasestorage.app",
  messagingSenderId: "766132865816",
  appId: "1:766132865816:web:3ac6427c10fbebcbd66c6d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);