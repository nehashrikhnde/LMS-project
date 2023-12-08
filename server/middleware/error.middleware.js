const errorMiddleware=(error,_req,res,_next)=>{
    error.statuscode=error.statuscode||500;
    error.message = error.message||"something wet wrong!";


   return  res.status(error.statusCode).json({
        success:false,
        message:error.message,
        stack:error.stack

    })
    

}
export default errorMiddleware;