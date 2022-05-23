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
    } catch (err) {
        console.error(err.message)
    }
})

//get one
app.get('/api/meals/:id', async(req,res) => {
    try {
        const data = await pool.query('SELECT * FROM meals WHERE meal_id = $1;', [req.params.id])
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//post one
app.post('/api/meals', async(req,res) => {
    try {
        if (![req.body.name, req.body.ingredients, req.body.prep_time].includes(undefined)) {
            const data = await pool.query('INSERT INTO meals (name, ingredients, prep_time) VALUES ($1, $2, $3);', [req.body.name, req.body.ingredients, req.body.prep_time])
            res.json(data.rows)
        } else {
            res.send('Information is missing')
        }
    } catch (err) {
        console.error(err.message)
    }
})

//create server
app.listen(PORT, () => {
    console.log('listening on port:', PORT)
})