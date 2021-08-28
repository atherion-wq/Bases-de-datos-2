const express = require('express');
const app = express();


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use(require('./routes/index.js'));

app.listen(3000)
console.log('Estoy conectado al puerto 3000')
