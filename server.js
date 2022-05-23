import dotenv from 'dotenv';
import express from 'express';
import pool from './database/connect.js';
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(express.static("public"));

//get all
app.get('/api/meals', async(req,res) => {
    try {
        const data = await pool.query('SELECT * FROM meals;')
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
});

//get one
app.get('/api/meals/:id', async(req,res) => {
    try {
        const data = await pool.query('SELECT * FROM meals WHERE meal_id = $1;', [req.params.id])
        res.json(data.rows)
    } catch (err) {
        console.error(err.message)
    }
});

//post one
app.post('/api/meals', async(req,res) => {
    try {
        if (![req.body.name, req.body.ingredients, req.body.prep_time].includes(undefined)) {
            const data = await pool.query('INSERT INTO meals (name, ingredients, prep_time) VALUES ($1, $2, $3) RETURNING *;', [req.body.name, req.body.ingredients, req.body.prep_time])
            res.json(data.rows)
        } else {
            res.send('Information is missing')
        }
    } catch (err) {
        console.error(err.message)
    }
});

//update one
app.patch('/api/meals/:id', async(req,res) => {
    try {
        const { name, ingredients, prep_time } = req.body
        const meal = await pool.query('SELECT * FROM meals WHERE meal_id = $1', [req.params.id])
        const obj = {
            name: name || meal.rows[0].name,
            ingredients: ingredients || meal.rows[0].ingredients,
            prep_time: prep_time || meal.rows[0].prep_time
        }
        const updatedMeal = await pool.query('UPDATE meals SET name = $1, ingredients = $2, prep_time = $3 WHERE meal_id = $4 RETURNING *;', [obj.name, obj.ingredients, obj.prep_time, req.params.id])
        res.json(updatedMeal.rows)
    } catch (err) {
        console.error(err.message)
    }
});

//delete one
app.delete('/api/meals/:id', async(req,res) => {
    try {
        const deleted = await pool.query('DELETE FROM meals WHERE meal_id = $1;', [req.params.id])
        res.send('Meal has been deleted')
    } catch (err) {
        console.error(err.message)
    }
});

//create server
app.listen(PORT, () => {
    console.log('listening on port:', PORT)
});