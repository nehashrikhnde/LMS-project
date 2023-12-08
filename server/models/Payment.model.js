import{model ,Schema} from 'mongoose';

const paymentSchema =new Schema({
 rzorpay_payment_id:{
    type:String,
    required:true
 },
 razorpay_subcription_id:{
    type:String,
    required:true,

 },
 razorpay_subcription_id:{
    type:string,
    required:true
 }
},{
   timestamps:true
});

const Payment = model('payment',paymentSchema);

export default Payment;