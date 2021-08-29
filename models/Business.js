import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const businessSchema = mongoose.Schema({
  userType: String,
  businessName: String,
  businessABN: {
    type: String,
    unique: true,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false
  },
  jobDescription: String,
  jobPositiion: String,
  jobLocation: String,
  experienceRequired: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  logo: String,
  contactNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  culturalInformation: String,
  address: {
    streetName: String,
    city: String,
    state: String,
    country: String,
    postalCode: Number,
  },
  skillsSeeking: [String],
  createdAt: {
    type: Date,
    default: new Date()
  },
});

const Business = mongoose.model('Business', businessSchema);

export default Business;