// frontend/js/parts.js
async function loadParts(containerId, filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const data = await fetchAPI(`/parts?${params}`);
  const container = document.getElementById(containerId);
  container.innerHTML = data.data.map(part => renderPartCard(part)).join('');
}

function renderPartCard(part) {
  return `
    <div class="card fade-in">
      <img src="${part.images?.[0] || '../images/placeholder.jpg'}" alt="${part.name}">
      <div class="card-body">
        <h4>${part.name}</h4>
        <p>${formatPrice(part.price)}</p>
        <a href="part-details.html?id=${part._id}">وردەکاری</a>
      </div>
    </div>`;
}
