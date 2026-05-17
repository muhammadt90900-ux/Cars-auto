// favoriteController.js (NEW)
const Favorite = require('../models/Favorite');
exports.addFavorite = async (req, res, next) => {
  try {
    const { itemType, itemId } = req.body;
    const fav = await Favorite.create({ user: req.user.id, itemType, itemId });
    res.status(201).json({ success: true, data: fav });
  } catch (err) { next(err); }
};
exports.removeFavorite = async (req, res, next) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Removed from favorites' });
  } catch (err) { next(err); }
};
exports.getFavorites = async (req, res, next) => {
  try {
    const favs = await Favorite.find({ user: req.user.id }).populate('itemId');
    res.status(200).json({ success: true, data: favs });
  } catch (err) { next(err); }
};
