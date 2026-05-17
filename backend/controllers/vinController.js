// vinController.js (mock)
exports.lookupVin = async (req, res) => {
  // In real implementation call vinService.lookupVin(req.params.vin)
  const sampleData = { vin: req.params.vin, make: 'Toyota', model: 'Corolla', year: 2020 };
  res.status(200).json({ success: true, data: sampleData });
};
exports.getVinHistory = async (req, res) => {
  res.status(200).json({ success: true, data: [] });
};
