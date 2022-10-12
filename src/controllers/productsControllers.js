const listAllProducts = async (req, res) => {
  res.status(200).json({ message: 'all products' });
};

module.exports = {
  listAllProducts,
};
