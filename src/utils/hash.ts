import bcrypt from 'bcryptjs';

//utility function to hash password and compare password
export const hashPassword = (password: string) => bcrypt.hashSync(password, 10);
export const comparePassword = (hashed: string, password: string) => bcrypt.compare(password, hashed);