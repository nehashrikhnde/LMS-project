import crypto from 'crypto';

import {schema,model} from "mongoose";
import bcrypt from'bcryptjs';
import jwt from 'jsonwebtoken';



const userschema = new schema({
     fullName:{
type:'string',
required:[true,'name is require'],
minlength:[5,'name must be at least 5 character'],
maxlength:[50,'name should be less than 50 character'],
lowercase:true,
trim:true,
     },
     email:{
type:'string',
required:[true,'email is require'],
lowercase:true,
trim:true,
unique:true,
match:[
   / ^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
   'please fill in a valid email address',
]
     },
password:{
    type:'string',
    required:[true,'password is require'],
    minlength:[8,'password must be at least 8 character'],
    select:false
},
avatar:{
    publi_id:{
        type:'string',
    },
    secure_url:{
        type:'string'
    }
},
role:{
type:'string',
enum:['USER','ADMIN'],
default:"USER"
},
forgotpasswordtoken:string,
forgotpasswordexpiry:date,
},
{
    timestamps:true
});
 
userschema.pre('save',async function(next){
if(!this.isModified('password'))
    return next();

this.password = await bcrypt.hash(this.password,10);
});

userschema.methods={
    
        comparePassword:async function (plainPassword){
            return await bcrypt.compare(plainPassword,this.password);
        },
        generateJWTToken: async function(){
        return  await jwt.sign(
            {id:this._id,subscription:this.subscription,role:this.role},
           process.env.JWT_SECRET,
           {
                 expiresin:process.env.JWT_EXPIRY,
           }
        )
    },
   
    generatePasswordResetToken:async function(){
        const resetToken = crypto.randomBytes(20).tostring('hex');
    

        this.forgotPasswordToken= crypto
        .createHash('sha256')
        .update('resettoken')
        .digest('hex')

        this.forgotPasswordExpiry=Date.now() + 15 * 60 * 1000;
return resetToken
    }  

}

const User =model('User',userschema);

export default User;