import mongoose, { models, Schema } from 'mongoose';
import { IDriving, ITime } from '@/types';

interface ICargoModel extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  startDate: string;
  startTime: string;
  unloadDate: string;
  unloadTime: string;
  averageSpeed: number;
  distance: number;
  eightHoursBreak: number;
  oneHoursBreak: number;
  remainingWorkHours: number;
  remainingTime: ITime;
  driving: IDriving;
  duration: ITime;
  created: Date;
}

const cargoSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  startDate: { type: String, required: true },
  startTime: { type: String, required: true },
  unloadDate: { type: String, required: true },
  unloadTime: { type: String, required: true },
  averageSpeed: { type: Number, required: true },
  distance: { type: Number, required: true },
  eightHoursBreak: { type: Number, required: false },
  oneHoursBreak: { type: Number, required: false },
  remainingWorkHours: { type: String, required: false },
  remainingTime: {
    type: {
      hours: Number,
      minutes: Number,
      second: { type: Number, required: false },
    },
    required: true,
  },
  driving: {
    type: {
      hours: Number,
      minutes: Number,
      second: { type: Number, required: false },
      durationInSeconds: Number,
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
