const express = require("express");
const session = require("express-session");
const routes = express.Router();
const flash = require("connect-flash");

routes.get('/', (req,res) =>{

  return res.render('index');
  
})

routes.get('/carteira/', (req,res) =>{

  return res.render("carteira");
  
})

module.exports = routes;