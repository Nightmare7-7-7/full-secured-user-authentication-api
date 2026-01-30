import {z} from 'zod';

const customMsgs = {
    json_err:'please provide valid registration details in JSON format',
    empty_name:"fullname shouldnt be empty",
    short_name:'fullname must be at least 3 characters long',
    empty_email:'email shouldnt be empty',
    invalid_email:'please provide a valid email address',
    empty_password:"password shouldnt be empty",
    short_password:'password must be at least 6 characters long'
}



export const registerValidator = z.object({
    fullname: z.string(customMsgs.empty_name).min(3,customMsgs.short_name),
    email:z.string(customMsgs.empty_email).email(customMsgs.invalid_email),
    password: z.string(customMsgs.empty_password).min(6,customMsgs.short_password)
},customMsgs.json_err)


