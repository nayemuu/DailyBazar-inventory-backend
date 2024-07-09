import mongoose from 'mongoose';
const { Schema } = mongoose;

const locationSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 50,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  logo: {
    type: String,
    required: true,
  },
});

export const locationModel = mongoose.model('Location', locationSchema);
