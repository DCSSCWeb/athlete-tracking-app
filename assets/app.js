import { db } from "./firebase.js";
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = btoa(document.getElementById("registerPassword").value);
    const role = document.getElementById("registerRole").value;

    try {
        await addDoc(collection(db, "users"), { name, email, password, role });
        alert("Registration successful!");
    } catch (error) {
        console.error("Error registering user:", error);
    }
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = btoa(document.getElementById("loginPassword").value);

    try {
        const q = query(collection(db, "users"), where("email", "==", email), where("password", "==", password));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            alert("Login successful!");
            document.getElementById("auth-section").style.display = "none";
            document.getElementById("main-section").style.display = "block";
        } else {
            alert("Invalid credentials");
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
});

document.getElementById("logoutButton").addEventListener("click", () => {
    document.getElementById("auth-section").style.display = "block";
    document.getElementById("main-section").style.display = "none";
});

// Additional functionality for CSV upload and attendance tracking will go here.
