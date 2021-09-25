import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const businessSchema = mongoose.Schema({
    userType: String,
    businessName: String,
    businessABN: {
        type: String,
        unique: true,
        // required: true,
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
    logo: {
        data: Buffer,
        contentType: String,
        fileName: String,
    },
    mobileNumber: {
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
    roles: [{
        title: String,
        description: String,
        skillSet: String,
        talentIds: [String]
    }],
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const Business = mongoose.model('Business', businessSchema);

export default Business;