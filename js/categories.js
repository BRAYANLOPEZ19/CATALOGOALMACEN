import { db, collection, getDocs } from './firebase-config.js';

const categorySelect = document.getElementById('category');

export async function loadCategories() {
  const snapshot = await getDocs(collection(db, 'categories'));
  categorySelect.innerHTML = '<option value="">Seleccione una categoría</option>';
  snapshot.forEach(doc => {
    const cat = doc.data();
    const opt = document.createElement('option');
    opt.value = cat.name;
    opt.textContent = cat.name;
    categorySelect.appendChild(opt);
  });
}
