<img src="https://github.com/definecoder/test-devops-hack/blob/main/EcoSync.png?raw=true"  width="200" height="200">

# **EcoSync** by DEFINE CODERS

EcoSync is a full-stack application built with Next.js, Express.js, Prisma, and PostgreSQL.

## Project Structure

The project is divided into two main directories:

- `/client` - Contains the Next.js frontend application.
- `/server` - Contains the Express.js backend server, which uses Prisma for ORM and PostgreSQL as the database.

## Prerequisites

Before you begin, ensure you have installed:

- Node.js and npm
- PostgreSQL

## Installation

1. Clone the repository:

```bash
git clone https://github.com/definecoder/CS24-p2-define-coders.git
```

2. Install the dependencies in both the `/client` and `/server` directories:

```bash
cd EcoSync/client
npm install

cd ../server
npm install
```

## Configuration

In the `/server` & `/client` directory, rename `.env.example` to `.env` and fill in your PostgreSQL database details `with you postgres password e.g: "postgresql://postgres:YOURPASSWORDHERE@127.0.0.1:5432/ecosync"` and other environment variables from [this google doc link](https://docs.google.com/document/d/1j1UFD3U4ejqeDRb26N9WffqvaLzwYYAxGY2OaWlZTO4/edit?usp=sharing).

## Running the Application

1. Start the backend server:

```bash
cd EcoSync/server
npm run dev
```

2. In a new terminal window, start the frontend application:

```bash
cd EcoSync/client
npm run dev
```

The frontend application will be available at `http://localhost:3000`, and the backend server will be running at `http://localhost:8585` (or whatever port you specified).

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
## To run using Docker 
Go to the source directory and give the following command
```bash
docker compose up --build
```
## License

[MIT](https://choosealicense.com/licenses/mit/)
