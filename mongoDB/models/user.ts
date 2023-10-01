import mongoose, { models, Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  averageSpeed: { type: Number, required: true },
  role: { type: String, required: true },
});

const User = models.User || mongoose.model('User', userSchema);

export default User;
