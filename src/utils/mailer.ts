import nodemailer from "nodemailer";
import "dotenv/config";
const mail = ()=>{
    const mail = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL!,
            pass: process.env.PASSWORD!
        }});

    return mail;
}
export default mail();