// js/recommendation.js
async function loadRecommendations() {
  try {
    const data = await fetchAPI('/recommendations'); // assuming you add a route
    const container = document.getElementById('recommendations');
    if (!data.data) return;
    container.innerHTML = data.data.map(item => renderCard(item)).join('');
  } catch (e) { console.error(e); }
}
