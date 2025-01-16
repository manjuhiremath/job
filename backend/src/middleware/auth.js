import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT);
      const user = await User.findByPk(decoded.userId); 
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
  
      req.user = user; 
      next(); 
    } catch (err) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  };