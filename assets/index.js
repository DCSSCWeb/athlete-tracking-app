import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASHIo2OGgOf8mKYMDwQWo-gJqX0XV8f_0",
    authDomain: "athlete-tracking-20c05.firebaseapp.com",
    projectId: "athlete-tracking-20c05",
    storageBucket: "athlete-tracking-20c05.appspot.com",
    messagingSenderId: "441422502953",
    appId: "1:441422502953:web:85ce16151455b3c0f15038",
    measurementId: "G-QGLGJ1P6BG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Register event listener
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const role = document.getElementById("registerRole").value;

    if (!name || !email || !password || !role) {
        alert("Please fill in all fields!");
        return;
    }

    try {
        // Add user to Firestore
        await addDoc(collection(db, "users"), {
            name: name,
            email: email,
            password: btoa(password), // Encode password for storage
            role: role,
        });

        alert("Registration successful!");

        // Redirect coach to the dashboard
        if (role === "coach") {
            window.location.href = "dashboard.html";
        } else {
            alert("Athlete registration is currently not supported.");
        }
    } catch (error) {
        console.error("Error during registration: ", error);
        alert("Failed to register. Please try again.");
    }
});