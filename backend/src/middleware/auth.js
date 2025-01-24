import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log("auth token", token);
  
  try {
    if (!token) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};