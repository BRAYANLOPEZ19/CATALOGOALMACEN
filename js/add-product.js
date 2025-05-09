import {
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  collection
} from './firebase-config.js';

const form = document.getElementById('product-form');
const imageInput = document.getElementById('image');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const productId = document.getElementById('productId').value;
  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const category = document.getElementById('category').value.trim();
  const stock = parseInt(document.getElementById('stock').value);
  const imageFile = imageInput.files[0];

  if (!name || !description || isNaN(price) || !category || isNaN(stock)) {
    alert('Por favor completa todos los campos correctamente.');
    return;
  }

  try {
    let imageUrl = '';

    if (imageFile) {
      const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const productData = {
      name,
      description,
      price,
      category,
      stock,
      updatedAt: serverTimestamp()
    };

    if (imageUrl) {
      productData.imageUrl = imageUrl;
    }

    if (productId) {
      // Actualizar producto existente
      await updateDoc(doc(db, 'products', productId), productData);
      alert('Producto actualizado correctamente.');
    } else {
      // Crear nuevo producto
      await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: serverTimestamp()
      });
      alert('Producto agregado correctamente.');
    }

    form.reset();
    document.getElementById('productId').value = '';
    location.reload();

  } catch (error) {
    console.error('Error al guardar el producto:', error);
    alert('Ocurrió un error al guardar el producto.');
  }
});
