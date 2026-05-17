// vinService.js
exports.lookupVin = async (vin) => {
  // Call external VIN API
  return { vin, make: 'Sample', model: 'Sample', year: 2022 };
};
