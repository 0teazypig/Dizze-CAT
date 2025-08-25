// cart.js
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");

  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    const totalPrice = item.price * item.quantity;
    subtotal += totalPrice;

    row.innerHTML = `
      <td><img src="${item.img}" alt="${item.name}" class="cart-img"></td>
      <td>${item.name}</td>
      <td>R${item.price.toLocaleString()}</td>
      <td><input type="number" min="1" value="${item.quantity}" data-index="${index}" class="qty-input"></td>
      <td>R${totalPrice.toLocaleString()}</td>
      <td><button class="remove-btn" data-index="${index}">X</button></td>
    `;
    cartItemsContainer.appendChild(row);
  });

  subtotalEl.textContent = "R" + subtotal.toLocaleString();
  let shipping = cart.length > 0 ? 100 : 0;
  totalEl.textContent = "R" + (subtotal + shipping).toLocaleString();

  document.querySelectorAll(".qty-input").forEach(input => input.addEventListener("change", updateQuantity));
  document.querySelectorAll(".remove-btn").forEach(btn => btn.addEventListener("click", removeItem));

  document.querySelector(".checkout-btn").addEventListener("click", () => {
    if(cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      window.location.href = "./checkout.html";
    }
  });
}

function updateQuantity(e) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = e.target.dataset.index;
  const value = parseInt(e.target.value);
  if(value < 1) e.target.value = 1;
  cart[index].quantity = e.target.value;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(e) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = e.target.dataset.index;
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

document.addEventListener("DOMContentLoaded", loadCart);
