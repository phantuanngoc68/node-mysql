const express = require('express');
const app = express();



module.exports = {
    category: function (req, res) {
        let query = "SELECT * FROM `categories`";
        db.query(query, (err, result) => {
            res.render('category', { categories:result});
        });
    },
    contact: function (req, res) {
        res.send("Contact Page");
    }
};