import dotenv from 'dotenv'
import express from 'express';
import pool from './database/connect.js';
const app = express();
dotenv.config()

const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.static("public"))

//get all
app.get('/api/meals', async(req,res) => {
    try {
        const data = await pool.query('SELECT * FROM meals;')
        res.json(data.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//get one
app.get('/api/meals/:id', async(req,res) => {
    try {
        const data = await pool.query('SELECT * FROM meals WHERE meal_id = $1;', [req.params.id])
        res.json(data.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//create server
app.listen(PORT, () => {
    console.log('listening on port:', PORT)
})