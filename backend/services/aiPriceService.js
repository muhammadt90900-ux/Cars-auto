// aiPriceService.js (mock)
exports.suggestPrice = (carDetails) => {
  // simple estimation
  return 15000 + carDetails.year * 10;
};
