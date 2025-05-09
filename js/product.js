export function createProductCard(product) {
  const col = document.createElement('div');
  col.className = 'col-sm-6 col-md-4 col-lg-3 mb-4';

  // Animación AOS
  col.setAttribute('data-aos', 'fade-up');
  col.setAttribute('data-aos-delay', '100');

  const card = document.createElement('div');
  card.className = 'card h-100 shadow-sm bg-dark text-white';

  const img = document.createElement('img');
  img.src = product.imageUrl;
  img.className = 'card-img-top';
  img.alt = product.name;
  img.style.height = '200px';
  img.style.objectFit = 'cover';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body d-flex flex-column';

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = product.name;

  const description = document.createElement('p');
  description.className = 'card-text';
  description.textContent = product.description;

  // ✅ Formatear precio en quetzales con comas y decimales
  const formattedPrice = new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
    minimumFractionDigits: 2
  }).format(product.price); // Asegúrate de que `price` sea un número, no string

  const price = document.createElement('p');
  price.className = 'fw-bold mt-auto';
  price.textContent = formattedPrice;

  const whatsappBtn = document.createElement('a');
  const phone = '50244245501'; // ← Tu número de WhatsApp

  const message = `Hola, ¿me puede brindar más información sobre *${product.name}*?%0AImagen: ${encodeURIComponent(product.imageUrl)}`;
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  whatsappBtn.href = whatsappUrl;
  whatsappBtn.target = '_blank';
  whatsappBtn.className = 'btn btn-success mt-3';
  whatsappBtn.textContent = 'Comprar por WhatsApp';

  cardBody.append(title, description, price, whatsappBtn);
  card.append(img, cardBody);
  col.appendChild(card);

  return col;
}

