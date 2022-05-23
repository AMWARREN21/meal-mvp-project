import dotenv from 'dotenv'
import express from 'express';
import pool from './database/connect.js';
const app = express();
dotenv.config()

app.get('/api/meals', async(req,res) => {
    const data = await pool.query('SELECT * FROM meals;')
    res.json(data.rows)
})

app.listen(8000)