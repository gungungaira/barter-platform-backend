const jwt = require('jsonwebtoken');

const profileMiddleware = async (req, res, next) => {
  const storeHeader = req.headers.authorization;
  if (!storeHeader) {
    return res.status(401).json({ message: 'token not found' });
  }
  const splitData = storeHeader.split(" ")[1];
  try {
    const setToken = jwt.verify(splitData, process.env.JWT_SECRET);
    req.user = setToken;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = profileMiddleware;