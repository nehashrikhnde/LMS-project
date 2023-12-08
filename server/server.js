import app from './app.js';
import connectToDB from './config/dbconnection.js';


import Razorpay from 'razorpay';
import {v2} from 'cloudinary'




//cloudinary configuration
    v2.config({ 
        cloud_name:process.env. CLOUDINARY_API_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY , 
        api_secret:process.env.CLOUDINARY_API_SECRET ,
        
      });
//Razorpay configuration
export const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
})

const PORT = process.env.PORT||5000;

app.listen(PORT,async()=>{
    await connectToDB();
console.log(`app is running at http:locahost:${PORT}`);
});