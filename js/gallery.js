// =========================================
// 1. PRODUCT DATABASE
// =========================================
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

// Global variables to track selection
let currentProduct = null;
let currentColor = null;
let currentSize = null;

// =========================================
// 2. MAIN PRODUCT MODAL LOGIC
// =========================================

function openProduct(key) {
  currentProduct = products[key];
  if (!currentProduct) return;

  // Set the modal to display block (The Old Method)
  document.getElementById("productModal").style.display = "block";
  
  // Fill in the text details
  document.querySelector(".product-details h2").innerText = currentProduct.name;
  document.querySelector(".price").innerText = "₱" + currentProduct.price;

  // Reset size selection when opening a new product
  currentSize = null;
  document.querySelectorAll(".sizes button").forEach(btn => btn.classList.remove("selected"));

  // Create color swatches and set default image
  generateColors();
  const firstColor = Object.keys(currentProduct.colors)[0];
  changeColor(firstColor);
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

function generateColors() {
  const container = document.querySelector(".colors");
  container.innerHTML = ""; // Clear existing colors
  
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
  
  // Update main image and thumbnails
  document.getElementById("mainImage").src = img.front;
  document.getElementById("frontThumb").src = img.front;
  document.getElementById("backThumb").src = img.back;

  // Highlight selected color swatch
  document.querySelectorAll(".color").forEach(c => c.classList.remove("selected"));
  const activeColor = document.querySelector(".color." + color);
  if(activeColor) activeColor.classList.add("selected");
}

function setMainImage(src) {
  document.getElementById("mainImage").src = src;
}

// =========================================
// 3. SIZE CHART MODAL LOGIC
// =========================================

function openSizeChart() {
    const chartImg = document.getElementById("chartImage");
    const chartModal = document.getElementById("sizeChartModal");
    
    // Auto-detect which chart to show based on the page filename
    if (window.location.pathname.includes("women")) {
        chartImg.src = "img/Women_Size_Chart.jpg";
    } else {
        chartImg.src = "img/Men_Size_Chart.jpg";
    }
    
    // Open using the old display method
    chartModal.style.display = "block";
}

function closeSizeChart() {
    document.getElementById("sizeChartModal").style.display = "none";
}

// =========================================
// 4. CART & NAVIGATION EVENT LISTENERS
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  
  // Size Button Selection Logic
  const sizeBtns = document.querySelectorAll(".sizes button");
  sizeBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      sizeBtns.forEach(b => b.classList.remove("selected"));
      this.classList.add("selected");
      currentSize = this.innerText; 
    });
  });

  // Add to Cart Functionality
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
      alert(currentProduct.name + " (Size: " + currentSize + ") added to cart! 🛒");
      closeModal();
    });
  }
});

// Navigation Toggle for Mobile (Hamburger Menu)
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Close Modals when user clicks the background overlay
window.onclick = function(event) {
    const productModal = document.getElementById("productModal");
    const chartModal = document.getElementById("sizeChartModal");
    
    if (event.target == productModal) {
        closeModal();
    }
    if (event.target == chartModal) {
        closeSizeChart();
    }
}
