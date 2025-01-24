import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  const { email, password, name,careerGoals } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name ,careerGoals});
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const userId = user.id;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log(token);
    res.json({ message: 'Login successful', token, userId });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const getProfile = async (req, res) => {
  const id = req.user;
  console.log(id)
  try {
    const user = await User.findOne({ where: { id:id } });
    if (!user) return res.status(404).json({ error: 'User not found' });

   
    res.json({user});
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const updateProfile = async (req, res) => {
  const userId = req.user; 
  const { email, name, careerGoals } = req.body; 

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.email = email || user.email;
    user.name = name || user.name;
    user.careerGoals = careerGoals || user.careerGoals;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
