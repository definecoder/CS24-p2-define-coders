<img src="https://github.com/definecoder/test-devops-hack/blob/main/EcoSync.png?raw=true"  width="200" height="200">

# **EcoSync** by DEFINE CODERS

EcoSync is a full-stack application built with Next.js, Express.js, Prisma, and PostgreSQL. This was developed by team define codes for CODE SAMURAI 2024. This project handles waste collection and management for Dhaka North City Corporation. 

## Project Structure

The project is divided into two main directories:

- `/client` - Contains the Next.js frontend application.
- `/server` - Contains the Express.js backend server, which uses Prisma for ORM and PostgreSQL as the database.
- `/waste_management` - Contains the mobile app for the customres and employers

## RUNNING THE PROJECT USING DOCKER COMPOSE (RECCOMANDED)

1. Clone the repository:

```bash
git clone https://github.com/definecoder/CS24-p2-define-coders.git
```
2. Run frontend using:
```bash
cd .\client\
npm i
npm run dev
```
3. Open a new terminal in the project root directory and Run backend using:
```bash
cd .\server\
npm i
npm run dev
```

## Credentials set by the initial db migration

```json
{
  "SYSTEM_ADMIN": {
    "email": "admin@admin",
    "password": "admin"
  },
  "LAND_MANAGER": {
    "email": "codermehraj@gmail.com",
    "password": "admin"
  },
  "STS_MANAGER": {
    "email": "shafinnafiullah@gmail.com",
    "password": "admin"
  }
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
