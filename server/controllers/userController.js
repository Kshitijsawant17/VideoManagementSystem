import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MESSAGE_CONSTANTS } from '../utils/constants.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const users = await User.find();
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: MESSAGE_CONSTANTS.USER_EXISTS });
  const hashedPassword = await bcrypt.hash(password, 10);
  var user;
  if(users.length > 0) {
    user = await User.create({ name, email, password: hashedPassword, role:'client'  });
  }
  else {
    user = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role:'admin', 
      clone: true, 
      logo:'/uploads/logo/company_logo.png', 
      logo_agree: true 
    });
  }
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(
        { id: user._id },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: '1h' }
      ),
    });
  } else {
    res.status(400).json({ message: 'Invalid admin data' });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: MESSAGE_CONSTANTS.INVALID_EMAIL_PASSWORD });
  }
};

const getAdminProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: MESSAGE_CONSTANTS.USER_NOT_EXISTS });
  }
};

const fetchUsers = async (req, res) => {
  const users = await User.find({ role: { $ne: 'admin' } });
  if (users) {
    res.json({data: users});
  } else {
    res.status(404).json({ message: MESSAGE_CONSTANTS.USER_NOT_EXISTS });
  }
};

const uploadLogo = async (req, res) => {
  const { id } = req.body;
  const logoPath = req.logoPath;
  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  try {
    const result = await User.updateOne({ _id: id}, {$set: {logo: logoPath }});
    if (result.nModified === 0) {
      return res.status(404).json({ message: MESSAGE_CONSTANTS.USER_NOT_EXISTS });
    }
    return res.status(200).json({message: 'success', logoUrl: logoPath });
  } catch (error) {
    return res.status(500).json({message: 'error'});
  }
};

const getLogo = async (req, res) => {
  const {id} = req.body;
  const userData = await User.findOne({_id: id});
  if(userData.logo == "default") return res.status(200).json({message:'success', logoUrl: '/uploads/logo/company_logo.png'});
  else return res.status(200).json({message:'success', logoUrl: userData.logo});
}

const getAgreeStatus = async (req, res) => {
  const {id} = req.body;
  const userData = await User.findOne({_id: id});
  if(userData) return res.status(200).json({ status: 'success', agreeStatus: userData.logo_agree});
  else res.status(200).json({ status: 'error', message: MESSAGE_CONSTANTS.USER_NOT_EXISTS });
}

const changeAgreeStatus = async (req, res) => {
  const {userId, status} = req.body;
  try {
    await User.updateOne({ _id: userId }, { $set: { logo_agree:status }});
    if(status) return res.status(200).json({ status: 'success', message: MESSAGE_CONSTANTS.LOGO_CHANGE_AGREE });
    else return res.status(200).json({ status: 'success', message: MESSAGE_CONSTANTS.LOGO_CHANGE_DISAGREE });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error});
  }
}

const getCloneStatus = async (req, res) => {
  const {userId} = req.body;
  const userData = await User.findOne({_id: userId});
  if(userData) return res.status(200).json({ status: 'success', cloneStatus: userData.clone});
  else res.status(500).json({ status: 'error', message:MESSAGE_CONSTANTS.USER_NOT_EXISTS});
}

const changeCloneStatus = async (req, res) => {
  const {userId, status} = req.body;
  try {
    await User.updateOne({ _id: userId }, { $set: { clone:status }});
    return res.status(200).json({ status: 'success', message: 'Clone Status changed successfully!'});
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error});
  }
}

export { 
  registerUser, 
  loginAdmin, 
  getAdminProfile, 
  fetchUsers, 
  uploadLogo, 
  getLogo, 
  getAgreeStatus,
  changeAgreeStatus,
  getCloneStatus,
  changeCloneStatus
};
