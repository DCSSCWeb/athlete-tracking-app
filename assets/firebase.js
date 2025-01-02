import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyASHIo2OGgOf8mKYMDwQWo-gJqX0XV8f_0",
    authDomain: "athlete-tracking-20c05.firebaseapp.com",
    projectId: "athlete-tracking-20c05",
    storageBucket: "athlete-tracking-20c05.appspot.com",
    messagingSenderId: "441422502953",
    appId: "1:441422502953:web:85ce16151455b3c0f15038",
    measurementId: "G-QGLGJ1P6BG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
