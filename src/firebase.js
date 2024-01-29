import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyB4gsdqYtSKPZmAdQ3o7NEhAl9OX8fqlTk",
    authDomain: "vocationaliq.firebaseapp.com",
    databaseURL: "https://vocationaliq-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vocationaliq",
    storageBucket: "vocationaliq.appspot.com",
    messagingSenderId: "250048777908",
    appId: "1:250048777908:web:452ccb9222bfd0a244d1e1",
    measurementId: "G-ZF28FR8X0Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
export default app;