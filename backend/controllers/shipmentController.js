// shipmentController.js
const Shipment = require('../models/Shipment');
exports.getShipment = async (req, res, next) => {
  try {
    const shipment = await Shipment.findOne({ order: req.params.orderId });
    res.status(200).json({ success: true, data: shipment });
  } catch (err) { next(err); }
};
exports.updateShipment = async (req, res, next) => {
  try {
    const shipment = await Shipment.findOneAndUpdate({ order: req.params.orderId }, req.body, { new: true });
    res.status(200).json({ success: true, data: shipment });
  } catch (err) { next(err); }
};
