import {model,Schema}from "mongoose";


const courseSchema= Schema({
    title:{
        type:string,
        required:[true,'title is required'],
        minlength:[8,'title must be atleast 8 character'],
        maxlength:[59,'title should  be less than 60 character'],
        trim:true,
    },
description:{
    type:string,
    required:[true,'description is required'],
    minlength:[8,'description must be atleast 8 character'],
    maxlength:[200,'description should be less than 200 character']
} ,
category:{
    type:string,
    required:[true,'category is required']
},
thumbnail:{
    public_id:{
        type:string,
        required:true
    },
    secure_url:{
        type:string
    }

},
lectures:[
{ 
    title:string,
    description:string,
    lecture:{
        public_id:{
            type:string
        },
        secure_url:{
            type:string
        }
    }

}
],
numberoflectures:{
    type:number,
    default:0,
},
createdby:{
    type:string,
    required:true
}
},{
    timestamps:true
});
const Course=model('course',courseSchema);

export default Course;