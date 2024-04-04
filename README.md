<img src="https://github.com/definecoder/test-devops-hack/blob/main/EcoSync.png?raw=true"  width="200" height="200">

# **EcoSync** by DEFINE CODERS

EcoSync is a full-stack application built with Next.js, Express.js, Prisma, and PostgreSQL.

## Project Structure

The project is divided into two main directories:

- `/client` - Contains the Next.js frontend application.
- `/server` - Contains the Express.js backend server, which uses Prisma for ORM and PostgreSQL as the database.

## RUNNING THE PROJECT USING DOCKER COMPOSE (RECCOMANDED)

1. Clone the repository:

```bash
git clone https://github.com/definecoder/CS24-p2-define-coders.git
```
2. Open the source directory in a terminal and give the following command
```bash
docker compose up --build
```
wait for the docker compose to complete and then frontend application will be available running at `http://localhost:3000`, and the backend server will be running at `http://localhost:8585` (or whatever port you specified).

3. After backend and frontend services are running again open the source directory in `another terminal` and give the following command
```bash
docker exec -it backend /bin/bash -c "cd ./src && npx prisma migrate dev --name init && npx prisma db seed 2> /dev/null || echo \'Database is already seeded\'"
```
This will do the prisma migration and run the seed file to push initial data.

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

## RUNNING THE BACKEND USING AWS (IF DOCKER COMPOSE FAILS!)
Go to `client\data\apiRoutes` and comment the `first line` and uncomment the second
```js
export const baseUrl = "http://localhost:8585"; // Uncomment to run Locally 
// export const baseUrl = "http://13.250.36.61"; // Uncomment to run in AWS
```
## CONFIGURATION
In the `/server` & `/client` directory, rename `.env.example` to `.env` and fill in your PostgreSQL database details `with you postgres password e.g: "postgresql://postgres:YOURPASSWORDHERE@127.0.0.1:5432/ecosync"` and other environment variables from [this google doc link](https://docs.google.com/document/d/1j1UFD3U4ejqeDRb26N9WffqvaLzwYYAxGY2OaWlZTO4/edit?usp=sharing).

## RUNNING FRONTEND
Run the frontend using docker:
```bash
docker compose up --build
``` 
or locally by running following command:
```bash
cd .\client\
npm i
npm run dev
```


## NOTE ON USING AWS BACKEND
When running on AWS the frontend might face some slow network problems which can be fixed by switching speed from no thorttling to fast 3G. [You can check this video to see the demonstration of the problem mentioned here](https://drive.google.com/drive/folders/1B5N5o0ms7mizSYm5HNiAjJj0O82Zb1tq?usp=sharing).

## License

[MIT](https://choosealicense.com/licenses/mit/)
