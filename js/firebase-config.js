import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore, collection, getDocs, addDoc, deleteDoc,
  doc, updateDoc, serverTimestamp, getDoc // ✅ AÑADIDO AQUÍ
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

// ✅ CONFIGURACIÓN CORRECTA
const firebaseConfig = {
  apiKey: "AIzaSyAhgFL-5L3aH7gizbKEYr52sHQlbmWXoSg",
  authDomain: "catalogo-62b3a.firebaseapp.com",
  projectId: "catalogo-62b3a",
  storageBucket: "catalogo-62b3a.appspot.com",
  messagingSenderId: "828903046513",
  appId: "1:828903046513:web:a0b3a93fbe03d604900ad0",
  measurementId: "G-S5C7YM4Y0E"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ EXPORTACIONES COMPLETAS
export {
  db, storage,
  collection, getDocs, addDoc, deleteDoc,
  doc, updateDoc, serverTimestamp, getDoc, // ✅ AÑADIDO AQUÍ
  ref, uploadBytes, getDownloadURL
};
