const express = require('express');
const app = express();
const port = 3000;
var path = require('path');

const pages = require('./pages');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

// connection mysql

const mysql = require('mysql');
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myshop'
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.get('/', (req, res) => {
    res.render('index', {name:"ngoc"});
})
app.get('/category', pages.category);
app.get('/category/:id',(req, res) =>{

    let query = "SELECT * FROM `products` WHERE category_id ='" + req.params.id + "'";
    db.query (query, (err, result) => {
        res.render('category_detail', {title: 'My Shop',name: 'Products', products: result});
    });

});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})