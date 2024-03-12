import pg from 'pg'
import dotenv from 'dotenv'; 
dotenv.config()

/// Creating a new Pool from pg.Pool Class so that we don't have to open and close the client each time we make a query to db
const Pool = pg.Pool
//

const pool = new Pool(JSON.parse(process.env.DB_AUTHENTICATION_DATA)) // Using  bodyparser to parse the data imbedded in req.body into JSON 


// CRUD Routes Defination 

const getUser = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {

        if (error) {
            throw error;
        }
        res.status(200).json(results.rows)
    });
}; 

const getUserById = (req, res)=>{
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM users WHERE id= $1',[id] ,(error, results)=>{
    if(error){
            throw error
        }
        res.status(200).json(results.rows)
    })
}


const createUser = (req, res)=>{
    const {name, email} = req.body
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',[name, email], (error, results)=>{
        if(error){
            throw error; 
        }
        res.status(201).send(`User added with ID:${results.rows[0].id}`); 

    })
}

const updateUser = (req, res)=>{
    const id = parseInt(req.params.id); 
    const {name, email} = req.body; 

    pool.query('UPDATE users SET name =$1, email =$2 WHERE id =$3', [name, email, id], (error, results)=>{
        if(error){
            throw error;
        }
        res.status(200).send(`Uuser modified with ID ${id}`)

    })
}


const deleteUser = (req, res)=>{
    const id = parseInt(req.params.id); 
    pool.query('DELETE FROM users WHERE id=$1',[id],(err,results)=>{
        if(err){
            throw err; 

        }
        res.status(200).send(`User deleted with ID: ${id}`); 
    })
}

export{
    getUser, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser
}

