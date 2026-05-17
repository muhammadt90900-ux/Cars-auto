// js/dashboard.js
async function loadUserDashboard() {
  const user = await fetchAPI('/auth/me');
  document.getElementById('user-name').textContent = user.data.name;
}
