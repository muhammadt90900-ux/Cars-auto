// js/utils.js
function loadComponent(url, containerId) {
  fetch(url)
    .then(res => res.text())
    .then(html => document.getElementById(containerId).innerHTML = html);
}

function formatPrice(price, currency = 'IQD') {
  return new Intl.NumberFormat('ar-IQ', { style: 'currency', currency }).format(price);
}
