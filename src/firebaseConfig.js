
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBLwyxhaz6omVZOdf9NoRJpIPCRoCXtxA4",
    authDomain: "crud-app-45377.firebaseapp.com",
    projectId: "crud-app-45377",
    storageBucket: "crud-app-45377.appspot.com",
    messagingSenderId: "433464785885",
    appId: "1:433464785885:web:66801b0095ed844c015434"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)