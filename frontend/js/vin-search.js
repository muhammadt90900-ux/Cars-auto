// frontend/js/vin-search.js
async function lookupVin(vin) {
  const data = await fetchAPI(`/vin/lookup/${vin}`);
  return data.data;
}
