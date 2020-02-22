const express = require('express');
const cors = require('cors');
const mysql =  require('mysql');

const app = express();

let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SELECT_ALL_QUERY = 'SELECT * FROM tasks';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
});

connection.connect(err => {
    if(err){
        return err; 
    }
});

// console.log(connection);

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello from product server')
});

app.get('/task', (req, res) => {
    connection.query(SELECT_ALL_QUERY, (err, result) => {
        if(err) {
            return res.send(err);
        }
        else{
            return res.json({   
                data: result
            })
        }
    });
});

app.post('/task/add', (req, res) => {
    const {task, time} = req.body;
    const INSERT_QUERY = `INSERT INTO tasks( task, time) VALUES ('${task}','${time}')`;

    connection.query(INSERT_QUERY, (err, result) => {
        if(err) {
            return res.send(err);
        }
        else{
            return res.send('task added....');
        }
    });

});

app.delete('/task/delete', (req, res) => {
    const {id} = req.body;
    const DELETE_QUERY = `DELETE FROM tasks WHERE id=${id}`; 

    connection.query(DELETE_QUERY, (err,result) => {
        if(err) {
            return res.send(err);
        }
        else{
            return res.send('task deleted....');
        }
    });
});

app.listen(4000, () => {
    console.log(`Hello`)
});