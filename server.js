// Importing express using node module import syntax 
import express from 'express';
// Importing and configuring dotenv module to access varibales stored in .evn file
import dotenv from 'dotenv';
dotenv.config() // After calling the .config() method on dotenv oject , all my variables are stored in process.env
// Importing node-postgres for connecting to psql databse we will be using

import pg from 'pg'

import morgan from 'morgan';

import bodyParser from 'body-parser';

import {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from './queries.js';
// APP Configurations 
const app = express()
const PORT = process.env.PORT || 4000

app.use(bodyParser.json()); // to handle json data sent to the server and make it available to req.body 

// Mounting the bodyparser middleware(a function that has access to req, res, next obejcts from the express module) to app.use() 
app.use(bodyParser.urlencoded({ extended: true }))// to handle form data that are sent to the server in url-encoded format 

app.use(morgan('dev'));

// Defining Routes 

app.get('/', (req, res) => {
    res.json({ info: "Node.js, Expresss, and Postgres API" });
});


app.get('/users', getUser)
app.get('/users/:id',getUserById)
app.post('/users', createUser)
app.put('/users/:id', updateUser)
app.delete('/users/:id',deleteUser);
// Listening on the requests made to the server

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})


