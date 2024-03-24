import express, { urlencoded, Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config();
import checkDatabaseConnection from './db/connection';

import { PrismaClient } from '@prisma/client';
import errorWrapper from './middlewares/errorWrapper';
import CustomError from './services/CustomError';
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.send('EcoSync Server is Up...')
})

app.post('/addUser', async (req, res) => {   

    try {
        const {name, email, password} = req.body
        const user = await prisma.user.create({
        data: {
            username: name,
            email,
            hashedPassword: password
        }
    })

    res.json(user)
        
    } catch (error) {
        console.log(error)
    }

    
})


app.get('/users', async (req, res) => {
    try {
        console.log('Fetching users...')
        // get all user and include the role also 
        const users = await prisma.user.findMany({
            include: {
                role: true
            }
        })


        
        res.json(users)
    } catch (error) {
        console.log(error)
    }

    
} )

app.put('/updateUser/:id',  errorWrapper( async (req: Request, res: Response) => {

        const {id} = req.params
        const {name, email, password} = req.body
        // check if the user exist
        const userExists = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        

        if (!userExists) {
            throw new CustomError('User not found', 404);
        }





        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                username: name,
                email,
                hashedPassword: password
            }
        })

        res.json(user)
    
} )  )




// get all roles
app.get('/roles', async (req, res) => {
    try {
        console.log('Fetching roles...')
        const roles = await prisma.role.findMany({
        })
        res.json(roles)
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT,async () => {
    await checkDatabaseConnection()
    console.log(`Server is running on PORT ${PORT}`)
})
