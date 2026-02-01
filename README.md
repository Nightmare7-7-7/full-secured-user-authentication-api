<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
</p>

<h1 align="center">🔐 Full Secured User Authentication API</h1>


<p align="center">
  <a href="https://github.com/Nightmare7-7-7/full-secured-user-authentication-api/stargazers">
    <img src="https://img.shields.io/github/stars/Nightmare7-7-7/full-secured-user-authentication-api?style=social" alt="Stars"/>
  </a>
  <a href="https://github.com/Nightmare7-7-7/full-secured-user-authentication-api/network/members">
    <img src="https://img.shields.io/github/forks/Nightmare7-7-7/full-secured-user-authentication-api?style=social" alt="Forks"/>
  </a>
</p>

<br/>

## ✨ Features

- Secure registration & login with **bcrypt** password hashing  
- **JWT + Refresh Token** full authentication flow  
- **Password reset** (token based)  
- **HTTP-only + Secure** cookies for refresh tokens  
- **Prisma ORM** + **PostgreSQL**  
- Full **TypeScript** — excellent type safety  
- Structured logging & clean global error handling  
- Input validation using **Zod**  
- Organized, clean & scalable project structure  

<br/>

## 🗂 Project Structure

```text
full-secured-user-authentication-api/
├── prisma/                 # schema & migrations
├── src/
│   ├── controllers/        # route handlers
│   ├── middleware/         # auth, validation, error handling...
│   ├── routes/             # express routers
│   ├── services/           # business logic (auth, token, email...)
│   ├── types/              # custom typescript types & interfaces
│   ├── utils/              # helpers (jwt sign/verify, hash, etc)
│   └── app.ts              # or server.ts — main entry point
├── .env.example
├── package.json
└── tsconfig.json
