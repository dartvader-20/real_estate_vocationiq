import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBTZN_CZbEem0M4LiUj16SnQRHmpXQtu_o",
    authDomain: "vocationiq-quboyd.firebaseapp.com",
    databaseURL: "https://vocationiq-quboyd-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vocationiq-quboyd",
    storageBucket: "vocationiq-quboyd.appspot.com",
    messagingSenderId: "1481377163",
    appId: "1:1481377163:web:aa2390c0913a4b25399b8e",
    measurementId: "G-12GSESRH0Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
export default app;