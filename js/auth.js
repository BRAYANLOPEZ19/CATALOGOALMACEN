import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhgFL-5L3aH7gizbKEYr52sHQlbmWXoSg",
  authDomain: "catalogo-62b3a.firebaseapp.com",
  projectId: "catalogo-62b3a",
  storageBucket: "catalogo-62b3a.appspot.com",
  messagingSenderId: "828903046513",
  appId: "1:828903046513:web:a0b3a93fbe03d604900ad0",
  measurementId: "G-S5C7YM4Y0E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Manejo del login
document.getElementById('login-form').addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;

  const errorDiv = document.getElementById('error-message');
  const spinner = document.getElementById('spinner');

  if (errorDiv) errorDiv.style.display = 'none';
  if (spinner) spinner.style.display = 'block';

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, pass);
    const user = userCred.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists() && userSnap.data().role === "admin") {
      window.location.href = "admin.html";
    } else {
      mostrarError("No tienes permisos de administrador.");
      await auth.signOut();
    }
  } catch (error) {
    mostrarError("Error al iniciar sesión. Verifica tus credenciales.");
    console.error(error);
  } finally {
    if (spinner) spinner.style.display = 'none';
  }
});

// Mostrar mensaje de error
function mostrarError(mensaje) {
  const errorDiv = document.getElementById('error-message');
  if (errorDiv) {
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';
  } else {
    alert(mensaje); // fallback por si falta el div
  }
}
