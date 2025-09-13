let cart = [];
const categories = document.getElementById("Category")      
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const plantsContainer = document.getElementById("plants");
const loadingSpinner = document.getElementById("loading");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

// ================== API URLs ==================
const API_BASE = "https://openapi.programming-hero.com/api";
const API_PLANTS = `${API_BASE}/plants`;
const API_CATEGORIES = `${API_BASE}/categories`;

// ================== FUNCTIONS ==================

// Show/Hide Loading Spinner
const showLoading = () => loadingSpinner?.classList.remove("hidden");
const hideLoading = () => loadingSpinner?.classList.add("hidden");

// Load All Categories
async function loadCategories() {
    showLoading();
    try {
        const res = await fetch(API_CATEGORIES);
        const data = await res.json();

        const sidebar = document.querySelector("aside ul");
        sidebar.innerHTML = "";

        // Add "All Trees" button
        const allBtn = document.createElement("li");
        allBtn.innerHTML = `<a href="#" class="block bg-green-600 text-white px-4 py-2 rounded active">All Trees</a>`;
        allBtn.addEventListener("click", () => loadPlants());
        sidebar.appendChild(allBtn);

        // Create category buttons
        data.categories.forEach(cat => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="#" class="block hover:bg-green-100 px-4 py-2 rounded">${cat.category}</a>`;
            li.addEventListener("click", () => loadPlantsByCategory(cat.category_id));
            sidebar.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading categories:", error);
    } finally {
        hideLoading();
    }
}

// Load All Plants
async function loadPlants() {
    showLoading();
    try {
        const res = await fetch(API_PLANTS);
        const data = await res.json();
        displayPlants(data.plants);
    } catch (error) {
        console.error("Error loading plants:", error);
    } finally {
        hideLoading();
    }
}

// Load Plants By Category
async function loadPlantsByCategory(categoryId) {
    showLoading();
    try {
        const res = await fetch(`${API_BASE}/category/${categoryId}`);
        const data = await res.json();
        displayPlants(data.plants);
    } catch (error) {
        console.error("Error loading plants by category:", error);
    } finally {
        hideLoading();
    }
}

// Display Plants
function displayPlants(plants) {
    plantsContainer.innerHTML = "";
    if (!plants || plants.length === 0) {
        plantsContainer.innerHTML = `<p class="text-center text-gray-600">No plants found.</p>`;
        return;
    }

    plants.forEach(plant => {
        const card = document.createElement("div");
        card.className = "bg-white p-4 rounded-lg shadow";

        card.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}" class="w-full h-40 object-cover rounded">
            <h2 class="font-bold mt-2 cursor-pointer text-green-700 hover:underline">${plant.name}</h2>
            <p class="text-sm text-gray-600">${plant.short_description}</p>
            <div class="flex justify-between items-center mt-3">
                <span class="inline-block rounded text-green-600 text-sm font-semibold bg-green-200 px-2">${plant.category}</span>
                <span class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</span>
            </div>
            <button class="bg-green-600 text-white px-4 py-2 rounded-full w-full mt-4 hover:bg-green-700">Add to Cart</button>
        `;

        // Modal open on title click
        card.querySelector("h2").addEventListener("click", () => showPlantDetails(plant.id));

        // Add to cart button
        card.querySelector("button").addEventListener("click", () => addToCart(plant));

        plantsContainer.appendChild(card);
    });
}

// Show Plant Details (Modal)
async function showPlantDetails(id) {
    showLoading();
    try {
        const res = await fetch(`${API_BASE}/plant/${id}`);
        const data = await res.json();
        const plant = data.plant;

        modalContent.innerHTML = `
            <h2 class="text-xl font-bold mb-2">${plant.name}</h2>
            <img src="${plant.image}" class="w-full h-48 object-cover rounded mb-2">
            <p>${plant.description}</p>
            <p class="mt-2 font-bold">Category: ${plant.category}</p>
            <p class="font-bold">Price: <i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</p>
        `;
        modal.classList.remove("hidden");
    } catch (error) {
        console.error("Error loading plant details:", error);
    } finally {
        hideLoading();
    }
}

function closeModal() {
    modal.classList.add("hidden");
}

// ================== CART FUNCTIONS ==================
function addToCart(plant) {
    cart.push(plant);
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += parseFloat(item.price);
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-gray-100 p-2 rounded";
        li.innerHTML = `
            <span>${item.name}</span>
            <button class="text-red-500">✖</button>
        `;
        li.querySelector("button").addEventListener("click", () => removeFromCart(index));
        cartItems.appendChild(li);
    });

    cartTotal.innerHTML = `<p><i class="fa-solid fa-bangladeshi-taka-sign"></i>${total}</p>`;
}

// ================== FORM ==================
document.getElementById("donationForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thank you for your donation!");
});

// ================== INIT ==================
loadCategories();
loadPlants();