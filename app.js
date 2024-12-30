// Initialize an empty cart array
let cart = [];

// Function to update the cart count in the navbar
function updateCartCount() {
  const cartCount = cart.length;
  document.getElementById("cart-count").textContent = cartCount;
}

// Function to update the cart items in the Cart section
function updateCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; // Clear previous items
  let totalPrice = 0;

  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("flex", "justify-between", "items-center", "border-b", "pb-4");

    cartItem.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <button class="remove-item bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700" data-name="${item.name}">
        Remove
      </button>
    `;

    totalPrice += parseFloat(item.price);
    cartItemsContainer.appendChild(cartItem);
  });

  // Update the total price
  document.getElementById("total-price").textContent = totalPrice.toFixed(2);

  // Update the cart item remove button functionality
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const itemName = e.target.getAttribute("data-name");
      cart = cart.filter(item => item.name !== itemName);
      updateCartCount();
      updateCartItems();
    });
  });
}

// Event listener for adding products to the cart
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", (e) => {
    const productName = e.target.getAttribute("data-name");
    const productPrice = e.target.getAttribute("data-price");

    // Add item to the cart array
    cart.push({ name: productName, price: productPrice });
    updateCartCount();
    updateCartItems();
  });
});

// Checkout functionality
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length > 0) {
    alert("Proceeding to checkout...");
    cart = [];  // Clear cart after checkout
    updateCartCount();
    updateCartItems();
  } else {
    alert("Your cart is empty.");
  }
});
