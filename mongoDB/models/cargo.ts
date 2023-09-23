import mongoose, { models, Schema } from 'mongoose';

const cargoSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
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

const Cargo = models.Cargo || mongoose.model('Cargo', cargoSchema);

export default Cargo;
