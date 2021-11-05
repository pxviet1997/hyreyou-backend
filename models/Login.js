import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const loginSchema = mongoose.Schema({
    
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    } 
   
});

const Login = mongoose.model('Login',loginSchema);

export default Login;

