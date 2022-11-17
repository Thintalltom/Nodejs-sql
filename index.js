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

app.get('/createtab', (req,res) => {
    let sql ='CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), address VARCHAR(255), PRIMARY KEY(id)'
    db.query(sql, (err) => {
        if(err){
            throw err
        }
        res.send('table created')
    }
    )
})

//connect to a local host
app.listen('5000', (req, res) => {
    console.log('on port 5000')
})