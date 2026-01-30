import { hashPassword } from './../utils/hash';
import {prisma} from "../prisma";
import { ReturnError } from "../utils/error";
import { string } from 'zod';

export const createUser = async (res:any,fullname: string, email: string, password:string)=>{

    // Check if user already exists
    const exists = await prisma.user.findUnique({
        where: {email}
    });

    if(exists){
        ReturnError(res,400,"user with this email already exists");
        return;
    }

    // pass password to hashPassword utility function
    const hashed = await hashPassword(password);

    if(!hashed){
        ReturnError(res,500,"Internal server error");
        return;
    }

    // create user with only selected fields in return

    const user = await prisma.user.create({
        data:{
            fullName:fullname,
            email,
            password:hashed
        },
        select:{
            id:true,
            fullName:true,
            email:true
        }
    })

    //return user to controller
    return user;




}