import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const talentSchema = mongoose.Schema({
  userType: String,
  title: String,
  firstName: String,
  lastName: String,
  verified: {
    type: Boolean,
    default: false
  },
  profilePhoto: {
    data: Buffer,
    contentType: String,
    fileName: String,
  },
  certifications: [{
    data: Buffer,
    contentType: String,
    fileName: String,
    name: String
  }],
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: Date,
  mobileNumber: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    streetName: String,
    city: String,
    state: String,
    country: String,
    postalCode: Number,
  },
  jobHistory: [{
    companyName: String,
    jobPosition: String,
    jobDescription: String,
    yearOfExperience: String
  }],
  education: [{
    nameOfUniversity: String,
    nameOfDegree: String,
    degreeDuration: String
  }],
  expectedWorkType: [String],
  expectedSalary: String,
  expectedSalaryType: [String],
  expectedAvailability: [String],
  expectedSkillSet: [String],
  gender: String,
  nationality: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  certification: {
    data: Buffer,
    contentType: String,
    fileName: String,
  },
  matchesRoles: [{
    title: String,
    description: String,
    skillSet: [String],
    businessId: String
  }]
});

talentSchema.index({
  expectedSkillSet: true
});

const Talent = mongoose.model('Talent', talentSchema);

export default Talent;


// {
//     "_id": "10006546",
//     "userType":"Talent"
//     "title":"Mr",    
//     "firstName": "Ravi",
//     "lastName":"Aswanth",
//     "email":"ravi@gmail.com",
//     "password":"abc123",
//     "dateOfBirth":"13121996",
//     "profilePhoto":"uploaded",
//     "mobileNumber":"729945788",
//     "address":{
//             "streetName" :"portsmouth",         
//             "city": "Epping",
//             "state":"Melbourne",
//             "country": "Australia",
//             "postalCode" : "3075",
//         },
//     "jobHistory":[{
//             "companyName":"Wipro",
//             "jobPosition" :"softwareDeveloper",
//             "jobDescription":"developer",
//             "yearOfExperience":"2years"
//         }],    
//         "skills": ["java", "react", "node"],
//         "education":[{
//             "nameOfUniversity":"latrobe",
//             "nameOfDegree":"Masters",
//             "degreeDuration":"2years"
//         }],
//         "culturalPreferences":["any"],
//         "availability":["Monday","tuesday"],
//         "gender":"Male",
//         "nationality":"Indian",
//         "createdAt": "2016-01-03T05:00:00.000Z",

//     }
