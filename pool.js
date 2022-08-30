const express = require('express');
const app = express();
const PORT = process.env.Port || 3000;

//app.use for optional body data
app.use(express.json())

const {Pool} = require('pg')

app.listen(PORT, () => {
    console.log('listening on port:' + PORT)
});

const pool = new Pool ({
    user: 'krono',
    password: 'f',
    host: 'localhost',
    port: 5432,
    database: 'petsDB'
})

//create one
app.post('/pets', async (req, res) => {
    try {
        const {name, age, kind} = req.body;
        const {rows} = await pool.query('INSERT INTO pets(name, age, kind) VALUES ($1, $2, $3)', [name, age, kind])
        //const result = pool.query('SELECT * FROM pets');
        res.send(rows)
    } catch (error) {
        res.send(error.message);
    }
});

//get one
app.get('/pets/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {rows} = await pool.query('SELECT * FROM pets WHERE pet_id = $1;', [id]);
        res.status(200).send(rows);
    } catch (error) {
        res.send(error.message);
    }
})

//get all
app.get('/pets', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pets');
        const rows = result.rows;
        res.send(rows)
    } catch (error) {
        console.error(error.message);
    }
})

//patch one
app.patch('/pets/:id', async (req, res) => {
    try {
        const {name, age, kind} = req.body
        const {id} = req.params
        const {rows} = await pool.query('UPDATE pets SET name = $1, age = $2, kind = $3 WHERE pet_id = $4', [name, age, kind, id])
        res.status(200).send(rows);
    } catch (error) {
        console.error(error.message);
    }
})

//delete one
app.delete('/pets/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {rows} = await pool.query('DELETE FROM pets WHERE pet_id = $1;', [id]);
        res.status(200).send(rows);
    } catch (error) {
        console.error(error.message);
    }
})