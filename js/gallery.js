// ===== PRODUCT DATABASE =====
const products = {

  // WOMEN
  crop: {
    name: "Lumine Long Sleeve Crop",
    price: "₱1299",
    colors: {
      white: { front: "img/Lumine_Long_Sleeve_Crop_White_Front.jpeg", back: "img/Lumine_Long_Sleeve_Crop_White_Back.jpeg" },
      black: { front: "img/Lumine_Long_Sleeve_Crop_Black_Front.jpeg", back: "img/Lumine_Long_Sleeve_Crop_Black_Back.jpeg" },
      navy: { front: "img/Lumine_Long_Sleeve_Crop_Navy_Front.jpeg", back: "img/Lumine_Long_Sleeve_Crop_Navy_Back.jpeg" },
      grey: { front: "img/Lumine_Long_Sleeve_Crop_Grey_Front.jpeg", back: "img/Lumine_Long_Sleeve_Crop_Grey_Back.jpeg" }
    }
  },

  // MEN
  mshirt: {
    name: "Lumine Shirt",
    price: "₱999",
    colors: {
      black: { front: "img/Lumine_Shirt_Black_Front.jpeg", back: "img/Lumine_Shirt_Black_Back.jpeg" },
      white: { front: "img/Lumine_Shirt_White_Front.jpeg", back: "img/Lumine_Shirt_White_Back.jpeg" }
    }
  }

}; // <-- close the products object

// ===== GLOBAL VARIABLE =====
let currentProduct; // needs to be accessible to all functions

// ===== OPEN PRODUCT =====
function openProduct(key) {
  currentProduct = products[key];
  document.getElementById("productModal").style.display = "block";

  document.querySelector(".product-details h2").innerText = currentProduct.name;
  document.querySelector(".price").innerText = currentProduct.price;

  generateColors();

  let first = Object.keys(currentProduct.colors)[0];
  changeColor(first);
}

// ===== CLOSE MODAL =====
function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

// ===== COLOR BUTTONS =====
function generateColors() {
  const container = document.querySelector(".colors");
  container.innerHTML = "";

  for (let color in currentProduct.colors) {
    let span = document.createElement("span");
    span.className = "color " + color;
    span.onclick = () => changeColor(color);

    container.appendChild(span);
  }
}

// ===== CHANGE COLOR =====
function changeColor(color) {
  const img = currentProduct.colors[color];

  document.getElementById("mainImage").src = img.front;
  document.getElementById("frontThumb").src = img.front;
  document.getElementById("backThumb").src = img.back;
}

// ===== SWITCH IMAGE =====
function setMainImage(src) {
  document.getElementById("mainImage").src = src;
}