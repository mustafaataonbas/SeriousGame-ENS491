const mongoose = require('mongoose');
const {Schema} = mongoose;

const playerSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please add a name']
    },
    surname: {
        type: String,
        required: [true, 'please add a surname']
    },
    username: {
        type: String,
        required: [true, 'please add a username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please add a password'],
    },    
    lastAuthentication: Date,
},
{
    timestamps: true,
})

module.exports = mongoose.model('Players', playerSchema)