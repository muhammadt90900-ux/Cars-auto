// js/search.js
async function initSearch() {
  document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('main-search').value.trim();
    if (query) {
      window.location.href = `pages/search.html?q=${encodeURIComponent(query)}`;
    }
  });
}
