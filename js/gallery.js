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

  document.getElementById("productModal").style.display = "block";
  document.querySelector(".product-details h2").innerText = currentProduct.name;
  document.querySelector(".price").innerText = "₱" + currentProduct.price;

  // Reset Size Selection
  currentSize = null;
  document.querySelectorAll(".sizes button").forEach(btn => btn.classList.remove("selected"));

  // Setup Colors
  generateColors();
  const firstColor = Object.keys(currentProduct.colors)[0];
  changeColor(firstColor);
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
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

  // UI Selection Highlight
  document.querySelectorAll(".color").forEach(c => c.classList.remove("selected"));
  const activeColor = document.querySelector(".color." + color);
  if(activeColor) activeColor.classList.add("selected");
}

function setMainImage(src) {
  document.getElementById("mainImage").src = src;
}

// ===== 4. SIZING & ADD TO CART LOGIC =====
// This ensures the code only runs AFTER the HTML is fully loaded on the screen
document.addEventListener("DOMContentLoaded", () => {
  
  // Sizing Buttons
  const sizeBtns = document.querySelectorAll(".sizes button");
  sizeBtns.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault(); // Stop any default button behavior
      
      // Remove 'selected' from all buttons, add to the clicked one
      sizeBtns.forEach(b => b.classList.remove("selected"));
      this.classList.add("selected");
      
      // Store the size
      currentSize = this.innerText; 
    });
  });

  // Add to Cart Button
  const addBtn = document.querySelector(".add-cart");
  if(addBtn) {
    addBtn.addEventListener("click", function(e) {
      e.preventDefault();
      
      if (!currentSize) {
        alert("Please select a size first! 📏");
        return;
      }

      const item = {
        name: currentProduct.name,
        price: currentProduct.price,
        color: currentColor,
        size: currentSize,
        image: currentProduct.colors[currentColor].front
      };

      // Get existing cart from memory, add new item, save it back
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      
      alert("Added to cart! 🛒");
      closeModal();
    });
  }
});
// OPEN SIZE CHART
function openSizeChart() {
    const chartModal = document.getElementById("sizeChartModal");
    const chartImg = document.getElementById("chartImage");
    
    // Checks if the current page is 'women.html'
    if (window.location.pathname.includes("women")) {
        chartImg.src = "img/Women_Size_Chart.jpg"; 
    } else {
        // Otherwise, it defaults to the Men's chart
        chartImg.src = "img/Men_Size_Chart.jpg";   
    }
    
    chartModal.style.display = "block";
}

// CLOSE SIZE CHART
function closeSizeChart() {
    document.getElementById("sizeChartModal").style.display = "none";
}

// CLICK OUTSIDE TO CLOSE
// Add this to your existing window.onclick function or add it if missing
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
