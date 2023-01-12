const express = require('express');
const app = express();

const keys = require('./config/keys')

//Database connection
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(keys.mongoURI,{useNewUrlParser:true, useUnifiedTopology: true});

//Database models
require('./model/Player');

//Routes
require("./routes/playerRoutes")(app);

app.listen(keys.port, () =>{
    console.log("Listening on port " + keys.port);
});