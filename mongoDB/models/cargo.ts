import mongoose, { models, Schema } from 'mongoose';

const cargoSchema = new Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endDate: { type: Date, required: true },
  endTime: { type: String, required: true },
  averageSpeed: { type: Number, required: true },
  distance: { type: String, required: true },
  longRest: { type: Number, required: false },
  shortRest: { type: Number, required: false },
  remainingWorkHours: { type: String, required: false },
});

const Cargo = models.User || mongoose.model('User', cargoSchema);

export default Cargo;
