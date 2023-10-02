import mongoose, { models, Schema } from 'mongoose';
import { ICargo } from '@/types';

interface ICargoModel extends Omit<ICargo, 'userId'>, Document {
  userId: mongoose.Schema.Types.ObjectId;
  created: Date;
}

const cargoSchema = new Schema<ICargoModel>({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  startDate: { type: String, required: true },
  startTime: { type: String, required: true },
  multipleUnload: { type: [{
    date: String,
    time: String,
    distance: Number,
    breakTime: String,
  }],
  required: false,
  },
  unloadDate: { type: String, required: false },
  unloadTime: { type: String, required: false },
  averageSpeed: { type: Number, required: true },
  totalDistance: { type: Number, required: true },
  eightHoursBreak: { type: Number, required: false },
  elevenHoursBreak: { type: Number, required: false },
  oneHoursBreak: { type: Number, required: false },
  remainingWorkHours: { type: String, required: false },
  type: { type: String, required: true },
  remainingTime: {
    type: {
      hours: Number,
      minutes: Number,
      second: { type: Number, required: false },
      totalInSeconds: { type: Number, required: true },
    },
    required: true,
  },
  driving: {
    type: {
      hours: Number,
      minutes: Number,
      second: { type: Number, required: false },
      totalInSeconds: Number,
    },
    required: true,
  },
  duration: {
    type: {
      hours: Number,
      minutes: Number,
      second: { type: Number, required: false },
    },
    required: true,
  },
  created: { type: Date, default: Date.now, immutable: true },
});

const Cargo = models.Cargo<ICargoModel> || mongoose.model<ICargoModel>('Cargo', cargoSchema);

export default Cargo;
