// modal.js
const products = document.querySelectorAll('.product');
const modal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImg');
const modalName = document.getElementById('modalName');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalAddBtn = document.querySelector('#productModal .btn');

let currentProduct = null;

// Open modal when product clicked
products.forEach(product => {
  product.querySelector('.btn').addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImg.src = product.dataset.img;
    modalName.textContent = product.dataset.name;
    modalDesc.textContent = product.dataset.desc;
    modalPrice.textContent = "R" + parseInt(product.dataset.price).toLocaleString();
    currentProduct = product;
  });
});

// Close modal
closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => {
  if(e.target === modal) modal.style.display = 'none';
});

// Add to cart
modalAddBtn.addEventListener('click', () => {
  if(!currentProduct) return;

  const name = currentProduct.dataset.name;
  const price = parseFloat(currentProduct.dataset.price);
  const img = currentProduct.dataset.img;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(item => item.name === name);

  if(existing) existing.quantity += 1;
  else cart.push({ name, price, img, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
  modal.style.display = 'none';
});
