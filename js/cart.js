let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cartItems");
const cartItemsContainerCheckout = document.getElementById("cartCheckoutItems");
const cartTotalElement = document.getElementById("cartTotal");
const checkoutBtn = document.querySelector(".checkout"); // Select the checkout button
const placeOrderBtn = document.querySelector(".placeOrder");

function displayCart() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p style='text-align:center;'>Your cart is currently empty.</p>";
        cartTotalElement.textContent = "0";
        if(checkoutBtn) checkoutBtn.style.display = "none"; // Hides checkout if empty
        return;
    }

    cart.forEach((item, index) => {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p style="text-transform: capitalize;">Color: ${item.color} | Size: ${item.size}</p>
                <p class="cart-price">₱${item.price}</p>
            </div>
            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;

        cartItemsContainer.appendChild(itemDiv);
        total += item.price;
    });

    cartTotalElement.textContent = total;
    if(checkoutBtn) checkoutBtn.style.display = "block"; // Show checkout if items exist
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function() {
        if (cart.length === 0) return;

        window.location.href="checkout.html";
    });
}
 
if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", function() {
        if (cart.length === 0) return;

       
        alert("Thank you for your purchase! Your order is being processed. 📦");

        localStorage.removeItem("cart");
        cart = [];
        
        window.location.href="index.html";
    });
}



displayCart();
