const express = require('express');
const app = express();

const keys = require('./config/keys')

//Setting up Database
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(keys.mongoURI,{useNewUrlParser:true, useUnifiedTopology: true});

//Setup Database Models
const Player = require('./model/Player');

//
const bcrypt = require('bcrypt')

//Routes
app.get('/players', async (req, res) => {
    const {name,surname,username,password} = req.query;

    if(!name || !surname || !username || !password){
        res.status(400)
        throw new Error('Please incude all fields!')
    }

    const playerExists = await Player.findOne({username})

    if(playerExists) {
        res.status(400)
        console.log('Player exists')
        throw new Error('This player already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const player = await Player.create({
        name,
        surname,
        username,
        password: hashedPassword,

        lastAuthentication: Date.now()
    })

    if(player) {
        res.status(201).json({
            _id: player._id,
            name: player.name,
            surname: player.surname,
            username: player.username,
            password: player.password,
        })
    } else{
        res.status(400)
        console.log('Invalid')
        throw new error('Invalid player data')
    }

});

app.listen(keys.port, () =>{
    console.log("Listening on port " + keys.port);
});