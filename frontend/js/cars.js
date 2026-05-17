// js/cars.js
async function loadLatestCars() {
  const data = await fetchAPI('/cars');
  const container = document.getElementById('latest-cars');
  container.innerHTML = data.data.map(car => renderCarCard(car)).join('');
}

function renderCarCard(car) {
  return `
    <div class="card fade-in">
      <img src="${car.images?.[0] || 'images/placeholder.jpg'}" alt="${car.make}">
      <div class="card-body">
        <h3>${car.make} ${car.model} (${car.year})</h3>
        <p>${formatPrice(car.price)}</p>
        <a href="pages/car-details.html?id=${car._id}">وردەکاری</a>
      </div>
    </div>`;
}
