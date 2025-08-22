// cart.js

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  cartItemsContainer.innerHTML = ""; // clear old rows
  let subtotal = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");

    const totalPrice = item.price * item.quantity;
    subtotal += totalPrice;

    row.innerHTML = `
      <td><img src="../${item.img}" alt="${item.name}" class="cart-img"></td>
      <td>${item.name}</td>
      <td>R${item.price.toLocaleString()}</td>
      <td><input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty-input"></td>
      <td>R${totalPrice.toLocaleString()}</td>
      <td><button class="remove-btn" data-index="${index}">X</button></td>
    `;
    cartItemsContainer.appendChild(row);
  });

  // Update summary
  subtotalEl.textContent = "R" + subtotal.toLocaleString();
  let shipping = cart.length > 0 ? 100 : 0;
  totalEl.textContent = "R" + (subtotal + shipping).toLocaleString();

  // Add event listeners for quantity updates & remove buttons
  document.querySelectorAll(".qty-input").forEach(input => {
    input.addEventListener("change", updateQuantity);
  });
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", removeItem);
  });
}

function updateQuantity(e) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = e.target.dataset.index;
  cart[index].quantity = parseInt(e.target.value);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart(); // refresh display
}

function removeItem(e) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = e.target.dataset.index;
  cart.splice(index, 1); // remove product
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Run on page load
document.addEventListener("DOMContentLoaded", loadCart);
