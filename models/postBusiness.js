import mongoose from 'mongoose';

const postSchema =mongoose.Schema({
    userType:String,
    businessName:String,
    businessABN:String,
    jobDescription:String,
    jobPositiion:String,
    jobLocation:String,
    experienceRequired:String,
    email:String,
    password:String,
    logo:String,
    contactNumber:Number,
    address:{
        streetName : String,         
        city: String,
        state:String,
        country: String,
        postalCode : Number,
    },
    skillsSeeking:[String],
    createdAt: {
        type:Date,
        default:new Date()
    },
});

const PostBusiness = mongoose.model('PostBusiness',postSchema);

export default PostBusiness;