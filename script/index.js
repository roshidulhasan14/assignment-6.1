let cart = [];
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const plantsContainer = document.getElementById("plants");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

// Load Categories
async function loadCategories() {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();

    const sidebar = document.getElementById("category-list");
    sidebar.innerHTML = "";

    // All Trees button
    const allBtn = document.createElement("li");
    allBtn.innerHTML = `<a href="#" class="block bg-green-600 text-white px-4 py-2 rounded">All Trees</a>`;
    allBtn.addEventListener("click", () => loadPlants());
    sidebar.appendChild(allBtn);

    data.categories.forEach((cat) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#" class="block hover:bg-green-100 px-4 py-2 rounded">${cat.category_name}</a>`;
      li.addEventListener("click", () => loadPlantsByCategory(cat.id));
      sidebar.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading categories:", err);
  }
}

// Load All Plants
async function loadPlants() {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    displayPlants(data.plants);
  } catch (err) {
    console.error("Error loading plants:", err);
  }
}

// Load Plants By Category
async function loadPlantsByCategory(id) {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const data = await res.json();
    displayPlants(data.plants);
  } catch (err) {
    console.error("Error loading plants by category:", err);
  }
}

// Display Plants
function displayPlants(plants) {
  plantsContainer.innerHTML = "";
  if (!plants || plants.length === 0) {
    plantsContainer.innerHTML = `<p class="text-center text-gray-600">No plants found.</p>`;
    return;
  }

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-lg shadow";

    card.innerHTML = `
      <img src="${plant.image}" alt="${plant.plant_name}" class="w-full h-40 object-cover rounded">
      <h2 class="font-bold mt-2 cursor-pointer text-green-700 hover:underline">${plant.name}</h2>
      <p class="text-sm text-gray-600">${plant.description}</p>
      <div class="flex justify-between items-center mt-3">
        <span class="inline-block rounded text-green-600 text-sm font-semibold bg-green-200 px-2">${plant.category}</span>
        <span class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</span>
      </div>
      <button class="bg-green-600 text-white px-4 py-2 rounded-full w-full mt-4 hover:bg-green-700">Add to Cart</button>
    `;

    card.querySelector("h2").addEventListener("click", () => showPlantDetails(plant.id));
    card.querySelector("button").addEventListener("click", () => addToCart(plant));

    plantsContainer.appendChild(card);
  });
}

// Show Plant Details (Modal)
async function showPlantDetails(id) {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
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
  } catch (err) {
    console.error("Error loading plant details:", err);
  }
}

function closeModal() {
  modal.classList.add("hidden");
}

// Cart
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

  cartTotal.innerHTML = `<i class="fa-solid fa-bangladeshi-taka-sign"></i>${total}`;
}

// Form
document.getElementById("donationForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your donation!");
});

// Init
loadCategories();
loadPlants();