import { getFirestore, collection, addDoc, writeBatch } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import Papa from "https://cdn.jsdelivr.net/npm/papaparse@5.3.0/papaparse.min.js";

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

document.getElementById("uploadCsv").addEventListener("click", () => {
    const fileInput = document.getElementById("csvFile");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a CSV file.");
        return;
    }

    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async function(results) {
            const data = results.data;

            try {
                const batch = writeBatch(db);
                const athletesRef = collection(db, "athletes");
                let recordCount = 0;

                data.forEach(row => {
                    const docRef = collection(db, "athletes").doc(); // Each row gets its own doc
                    batch.set(docRef, row);
                    recordCount++;
                });

                await batch.commit();
                alert(`${recordCount} athlete records uploaded successfully!`);
            } catch (error) {
                console.error("Error uploading CSV data: ", error);
                alert("Failed to upload CSV. Please try again.");
            }
        },
        error: function(error) {
            console.error("Error parsing CSV: ", error);
            alert("Failed to parse CSV file. Ensure it is correctly formatted.");
        }
    });
});
