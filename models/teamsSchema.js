const mongoose = require("mongoose");

const teamsSchema = new mongoose.Schema({
    teamname: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: true
    },
    createdon: {
        type: String,
        required: true
    },
    polls: [
        mongoose.Schema.Types.ObjectId
    ],
    teamMembers: [
        mongoose.Schema.Types.ObjectId
    ],
    invitedUsers: [
        mongoose.Schema.Types.ObjectId
    ],
    unInvitedUsers: [
        mongoose.Schema.Types.ObjectId
    ]
});

const Team = mongoose.model("TEAM", teamsSchema);

module.exports = Team;