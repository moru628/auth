const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:"signup"
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});


app.post('/signup', (req, res)=>{
    const email = req.body.email
    const password = req.body.password
    db.query("INSERT INTO login (`email`,`password`) VALUES (?,?)",[email, password], (error, data)=>{
        if (error) {
            return res,json(error)
        }
        
        return res.json(data)
    } )
})

app.post('/login', (req, res)=>{
    const email = req.body.email
    const password = req.body.password
    db.query("SELECT * FROM login WHERE `email` = ? AND `password` = ?",[email, password], (err, data)=>{
        if(err){
            return res.json('Error')
        }
        if(data.length > 0){
            return res.json("Success")
        }else{
            return res.json("Failed")
        }
    } )
})

app.listen(8081, ()=>{
    console.log('server is running on port 8081')
})