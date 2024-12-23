import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    required: true
  },
  clone: { 
    type: Boolean, 
    required: true,
    default: false
  },
  logo: { 
    type: String,
    required: true,
    default: "default"
  },
  logo_agree: { 
    type: Boolean, 
    required: true,
    default: false
  },
}, 
{ timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;