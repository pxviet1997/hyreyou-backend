import mongoose from 'mongoose';

const postSchema =mongoose.Schema({
    userType:String,
    title:String,
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    dateOfBirth:Date,
    profilePhoto:String,
    mobileNumber:Number,
    address:{
        streetName : String,         
        city: String,
        state:String,
        country: String,
        postalCode : Number,
    },
    jobHistory:[{
        companyName:String,
        jobPosition :String,
        jobDescription:String,
        yearOfExperience:String
    }],
    skills:[String],
    education:[{
        nameOfUniversity:String,
        nameOfDegree:String,
        degreeDuration:String
    }],
    culturalPreferences:[String],
    availability:[String],
    gender:String,
    nationality:String,
    createdAt: {
        type:Date,
        default:new Date()
    },
});

const PostTalents = mongoose.model('PostTalents',postSchema);

export default PostTalents;
