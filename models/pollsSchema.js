const mongoose = require("mongoose");

const pollsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    teamname: {
        type: String,
        required: true
    },
    createdby: {
        type: String,
        required: true
    },
    createdon: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    pollActive: {
        type: Boolean
    },
    usersVoted: [
        mongoose.Schema.Types.ObjectId
    ],
    optionTitle: {
        type: [String]
    },
    optionImg: {
        type: [String]
    },
    optionVoted: [
        {
            title: String,
            img: String,
            votes: Number
        }
    ]
});

const Poll = mongoose.model("POLL", pollsSchema);

module.exports = Poll;