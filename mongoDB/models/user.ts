import mongoose, { models, Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
});

const User = models.User || mongoose.model('User', userSchema);

export default User;
