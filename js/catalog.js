import { createProductCard } from './product.js';

export function renderCatalog(products, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}
