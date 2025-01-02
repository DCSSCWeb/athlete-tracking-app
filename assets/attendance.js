import { getFirestore, collection, getDocs, doc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
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

document.getElementById("backToDashboard").addEventListener("click", () => {
    window.location.href = "./dashboard.html";
});

const filterDay = document.getElementById("filterDay");
const filterCategory = document.getElementById("filterCategory");
const athleteList = document.getElementById("athleteList");

async function fetchAthletes() {
    let athletes = [];
    const q = query(collection(db, "athletes"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        athletes.push({ id: doc.id, ...doc.data() });
    });

    return athletes;
}

async function renderAthletes() {
    const athletes = await fetchAthletes();
    athleteList.innerHTML = "";

    const filteredAthletes = athletes.filter(athlete => {
        return (
            (filterDay.value ? athlete.day === filterDay.value : true) &&
            (filterCategory.value ? athlete.category === filterCategory.value : true)
        );
    });

    filteredAthletes.forEach(athlete => {
        const athleteDiv = document.createElement("div");
        athleteDiv.innerHTML = `
            <input type="checkbox" id="${athlete.id}" data-id="${athlete.id}">
            <label for="${athlete.id}">${athlete.name}</label>
        `;
        athleteList.appendChild(athleteDiv);
    });
}

filterDay.addEventListener("change", renderAthletes);
filterCategory.addEventListener("change", renderAthletes);

document.getElementById("submitAttendance").addEventListener("click", async () => {
    const checkboxes = athleteList.querySelectorAll("input[type='checkbox']:checked");
    const attendanceUpdates = [];

    checkboxes.forEach(checkbox => {
        const athleteId = checkbox.dataset.id;
        const docRef = doc(db, "attendance", athleteId);
        attendanceUpdates.push(updateDoc(docRef, { status: "Present" }));
    });

    try {
        await Promise.all(attendanceUpdates);
        alert("Attendance recorded successfully!");
    } catch (error) {
        console.error("Error recording attendance: ", error);
        alert("Failed to record attendance. Please try again.");
    }
});

// Initial render
renderAthletes();
