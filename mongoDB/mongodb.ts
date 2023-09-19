import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI || '');
    console.log('connected to mongo DB');
  } catch (error) {
    console.log('error with connection to mongo DB', error);
  }
};
