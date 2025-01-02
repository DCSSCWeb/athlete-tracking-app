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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Show and hide views based on hash
function updateView() {
    const hash = window.location.hash;
    document.getElementById('login').style.display = hash === '#register' ? 'none' : 'block';
    document.getElementById('register').style.display = hash === '#register' ? 'block' : 'none';
}

window.addEventListener('hashchange', updateView);
updateView(); // Initial view update

// Registration form submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = btoa(document.getElementById('registerPassword').value);
    const role = document.getElementById('registerRole').value;

    try {
        await db.collection('users').add({ name, email, password, role });
        alert('Registration successful');
        window.location.hash = ''; // Redirect to login
    } catch (error) {
        console.error('Error registering user:', error);
        alert('Failed to register user');
    }
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = btoa(document.getElementById('loginPassword').value);

    try {
        const querySnapshot = await db.collection('users').where('email', '==', email).where('password', '==', password).get();
        if (!querySnapshot.empty) {
            alert('Login successful');
            // Add navigation to the next part of the app here
        } else {
            alert('Invalid credentials');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Failed to login');
    }
});
