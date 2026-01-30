export const ReturnError = (res:any,status:number,message:string,errors?:any[])=>{
    return res.status(status).json({
        success:false,
        message,
        errors // optional 
    });
}