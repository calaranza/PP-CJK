// ===== 1. PRODUCT DATABASE =====
const products = {
  crop: {
    name: "Lumine Long Sleeve Crop",
    price: 1299,
    colors: {
      white: { front: "img/Lumine_Long_Sleeve_Crop_White_Front.jpeg", back: "img/Lumine_Long_Sleeve_Crop_White_Back.jpeg" },
      black: { front: "img/Lumine_Long_Sleeve_Crop_Black_Front.jpeg", back: "img/Lumine_Long_Sleeve_Crop_Black_Back.jpeg" },
      navy: { front: "img/Lumine_Long_Sleeve_Crop_Navy_Front.jpeg", back: "img/Lumine_Long_Sleeve_Crop_Navy_Back.jpeg" },
      gray: { front: "img/Lumine_Long_Sleeve_Crop_Grey_Front.jpeg", back: "img/Lumine_Long_Sleeve_Crop_Grey_Back.jpeg" }
    }
  },
  flowerdress: {
    name: "Lumine Autumn Flower Dress",
    price: 1299,
    colors: {
      white: { front: "img/Lumine_Flower_Dress.jpg", back: "img/Lumine_Flower_Dress.jpg" } 
    }
  }
};

// ===== 2. GLOBAL VARIABLES =====
let currentProduct = null;
let currentColor = null;
let currentSize = null;

// ===== 3. MODAL FUNCTIONS =====
function openProduct(key) {
  currentProduct = products[key];
  if (!currentProduct) return;

  document.getElementById("productModal").classList.add("show-modal");
  document.querySelector(".product-details h2").innerText = currentProduct.name;
  document.querySelector(".price").innerText = "₱" + currentProduct.price;

  currentSize = null;
  document.querySelectorAll(".sizes button").forEach(btn => btn.classList.remove("selected"));

  generateColors();
  const firstColor = Object.keys(currentProduct.colors)[0];
  changeColor(firstColor);
}

function closeModal() {
  document.getElementById("productModal").classList.remove("show-modal");
}

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

function changeColor(color) {
  currentColor = color;
  const img = currentProduct.colors[color];
  document.getElementById("mainImage").src = img.front;
  document.getElementById("frontThumb").src = img.front;
  document.getElementById("backThumb").src = img.back;

  document.querySelectorAll(".color").forEach(c => c.classList.remove("selected"));
  const activeColor = document.querySelector(".color." + color);
  if(activeColor) activeColor.classList.add("selected");
}

function setMainImage(src) {
  document.getElementById("mainImage").src = src;
}

// ===== 4. SIZE CHART LOGIC =====
function openSizeChart() {
    const chartModal = document.getElementById("sizeChartModal");
    const chartImg = document.getElementById("chartImage");
    
    // Check path for Women vs Men
    if (window.location.pathname.includes("women")) {
        chartImg.src = "img/Women_Size_Chart.jpg";
    } else {
        chartImg.src = "img/Men_Size_Chart.jpg";
    }
    
    chartModal.classList.add("show-modal");
}

function closeSizeChart() {
    document.getElementById("sizeChartModal").classList.remove("show-modal");
}

// ===== 5. EVENT LISTENERS =====
document.addEventListener("DOMContentLoaded", () => {
  // Sizing Buttons
  const sizeBtns = document.querySelectorAll(".sizes button");
  sizeBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      sizeBtns.forEach(b => b.classList.remove("selected"));
      this.classList.add("selected");
      currentSize = this.innerText; 
    });
  });

  // Add to Cart
  const addBtn = document.querySelector(".add-cart");
  if(addBtn) {
    addBtn.addEventListener("click", () => {
      if (!currentSize) {
        alert("Please select a size first! 📏");
        return;
      }
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({
        name: currentProduct.name,
        price: currentProduct.price,
        color: currentColor,
        size: currentSize,
        image: currentProduct.colors[currentColor].front
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart! 🛒");
      closeModal();
    });
  }
});

// Close when clicking background
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal();
        closeSizeChart();
    }
}
