import { db, collection, getDocs } from './firebase-config.js';
import { renderCatalog } from './catalog.js';

let allProducts = [];

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    allProducts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    populateCategories(allProducts);
    renderCatalog(allProducts, 'product-catalog');
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }

  document.getElementById('searchInput').addEventListener('input', filterProducts);
  document.getElementById('categoryFilter').addEventListener('change', filterProducts);
});

function populateCategories(products) {
  const categorySet = new Set(products.map(p => p.category).filter(Boolean));
  const categoryFilter = document.getElementById('categoryFilter');

  categorySet.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function filterProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const selectedCategory = document.getElementById('categoryFilter').value;

  const filtered = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  renderCatalog(filtered, 'product-catalog');
}
  