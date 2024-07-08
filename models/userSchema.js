const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    teams: [
        String
    ],
    invitaitionRecieved: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    invitaitionAccepted: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    invitaitionRejected: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    votedPolls: [
        mongoose.Schema.Types.ObjectId
    ]
});

// hashing passwords
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

const User = mongoose.model('USER', userSchema);

module.exports = User;