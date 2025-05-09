import {
  db, collection, getDocs, deleteDoc, doc, addDoc, getDoc
} from './firebase-config.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { loadCategories } from './categories.js';

// Cargar categorías al iniciar
loadCategories();

// Agregar categoría
document.getElementById('category-form').addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('cat-name').value.trim();
  const description = document.getElementById('cat-desc').value.trim();

  if (!name || !description) {
    alert('Por favor completa todos los campos de categoría.');
    return;
  }

  await addDoc(collection(db, 'categories'), { name, description });
  alert('Categoría guardada');
  e.target.reset();
});

// Validar sesión y rol del usuario
const auth = getAuth();
onAuthStateChanged(auth, async user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists() || userSnap.data().role !== "admin") {
    alert("No autorizado");
    window.location.href = "index.html";
  }
});

// Mostrar productos existentes
const container = document.getElementById('admin-product-list');
const form = document.getElementById('product-form');

async function loadProducts() {
  const snapshot = await getDocs(collection(db, 'products'));
  container.innerHTML = '';

  snapshot.forEach(docSnap => {
    const product = docSnap.data();
    const id = docSnap.id;

    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.imageUrl || ''}" style="max-width:100px"><br>
      <strong>${product.name}</strong><br>
      ${product.description}<br>
      Q${product.price}<br>
      <button data-edit="${id}">✏️ Editar</button>
      <button data-delete="${id}">🗑️ Eliminar</button>
    `;

    container.appendChild(div);
  });

  setAdminActions();
}

// Acciones de editar y eliminar
function setAdminActions() {
  document.querySelectorAll('[data-delete]').forEach(btn => {
    btn.onclick = async () => {
      if (confirm('¿Eliminar este producto?')) {
        await deleteDoc(doc(db, 'products', btn.dataset.delete));
        loadProducts();
      }
    };
  });

  document.querySelectorAll('[data-edit]').forEach(btn => {
    btn.onclick = async () => {
      const docSnap = await getDoc(doc(db, 'products', btn.dataset.edit));
      if (docSnap.exists()) {
        const p = docSnap.data();
        document.getElementById('productId').value = docSnap.id;
        form.name.value = p.name;
        form.description.value = p.description;
        form.price.value = p.price;
        form.category.value = p.category;
        form.stock.value = p.stock;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
  });
}

loadProducts();

