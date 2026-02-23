script.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
}

function updateCartDisplay() {
    let cartItems = document.getElementById("cartItems");
    let cartCount = document.getElementById("cartCount");
    let cartTotal = document.getElementById("cartTotal");

    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price;
        cartItems.innerHTML += `<p>${item.name} - ₦${item.price}</p>`;
    });

    if (cartCount) cartCount.innerText = cart.length;
    if (cartTotal) cartTotal.innerText = total;
}

function payWithPaystack() {
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    if (total === 0) {
        alert("Your cart is empty.");
        return;
    }

    let handler = PaystackPop.setup({
        key: "YOUR_PUBLIC_KEY_HERE",
        email: "customer@email.com",
        amount: total * 100,
        currency: "NGN",
        callback: function(response) {
            alert("Payment successful!");
            cart = [];
            saveCart();
        }
    });

    handler.openIframe();
}

updateCartDisplay();
