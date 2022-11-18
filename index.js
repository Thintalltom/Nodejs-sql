const express = require('express')
const mysql = require('mysql')

//create connection 
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database: 'nodesql'
})

// connect to mySql
db.connect(err => {
    if(err){
        throw err
    }
    console.log('Mysql connected')
})

const app = express()

//create database 
app.get('/createdb', (req,res) => {
let sql ='CREATE DATABASE nodesql'
db.query(sql, (err) => {
    if(err){
        throw err;
    }
    res.send('database created')
})
})

//create table

app.get('/createtable', (req,res) => {
    let sql ='CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), address VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql , (err) => {
        if(err){
            throw err;
        }
        res.send('table created')
    }
    )
})

// add values into the table

app.get('/employee1', (req, res) => {
    let post = {name: 'tiwaloluwa', address: 'lagos'}
    let sql = 'INSERT INTO employee SET ?'
    let query = db.query(sql, post, (err) => {
        if(err) {
            throw err;
        }
        res.send('VALUE ADDED')
    })
})

//select employee

app.get('/getemployeelist', (req, res) => {
    let sql = 'SELECT * FROM employee'
    let query = db.query(sql, (err, results) => {
        if(err){
            throw err
        }
        console.log(results)
        res.send('selected')
    })
})


//update employee list 

app.get('/updateemployee/:id', (req, res) => {
    let newInfo = 'olamide'
    let sql = `UPDATE employee SET name = '${newInfo}' WHERE id = '${req.params.id}'`
    let query = db.query(sql, err => {
        if(err)
        {
            throw err
        }
        res.send('Table employee update')
    })
})

//delete a user 

app.get('/deletemployee/:id', (req,res) => {
    let sql = `DELETE employee WHERE id = '${req.params.id}'`
    let query = db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Record deleted')
    })
})

//connect to a local host
app.listen('5000', (req, res) => {
    console.log('on port 5000')
})