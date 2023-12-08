class apperror extends error{
constructor(message,statuscode){
    super(message);

    this.statuscode=statuscode;

    error.capturestacktrace(this,this.constructor);
}
}

export default apperror;