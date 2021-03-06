import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const businessSchema = mongoose.Schema({
  userType: String,
  businessName: String,
  businessABN: {
    type: String,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false
  },
  description: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  logo: {
    data: Buffer,
    contentType: String,
    fileName: String,
  },
  contactNumber: {
    type: String,
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
  roles: [{
    title: String,
    description: String,
    skillSet: [String],
    talentIds: [String],
    shortlistedTalentIds: [String],
    rejectedTalentIds: [String]
  }],
  createdAt: {
    type: Date,
    default: new Date()
  },
});

businessSchema.index({
  email: 'text'
});

const Business = mongoose.model('Business', businessSchema);

export default Business;