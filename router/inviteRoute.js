const express = require("express");
const router = new express.Router();

const mongoose = require('mongoose');
const DB = process.env.DATABASE
require('../db/mongoose');

const User = require("../models/userSchema");
const Team = require("../models/teamsSchema");
const Poll = require("../models/pollsSchema");

const { requiredAuth, checkUser } = require("../auth/authMiddleware.js")

// sending invites
router.get('/teams/details/invite/:tid/:uid', requiredAuth, checkUser, async (req, res) => {
    try{
        const team = await Team.findById({ _id: req.params.tid })
        const user = await User.findById({ _id: req.params.uid })

        await Team.findByIdAndUpdate({ _id: req.params.tid }, {$push: { invitedUsers: user._id }})
        await User.findByIdAndUpdate({ _id: req.params.uid }, {$push: { invitaitionRecieved: team._id }})
        req.flash('message', user.name+' - User Invited Successfully')
        res.redirect('/teams/details/'+team._id)
    } catch (err) {
        console.log(err)
    }
})

// accepting invites
router.get('/:uid/notifications/team/invite/accept/:tid', requiredAuth, checkUser, async (req, res) => {
    try{
        const user = await User.findById({ _id: req.params.uid })
        const team = await Team.findById({ _id: req.params.tid })

        await Team.findByIdAndUpdate({ _id: req.params.tid }, {$pull: { invitedUsers: user._id }})
        await Team.findByIdAndUpdate({ _id: req.params.tid }, {$push: { teamMembers: user._id }})
        await User.findByIdAndUpdate({ _id: req.params.uid }, {$pull: { invitaitionRecieved: team._id }})
        await User.findByIdAndUpdate({ _id: req.params.uid }, {$push: { teams: team.teamname }})

        req.flash('message', team.teamname +' - Team Joined Successfully')
        res.redirect('/'+user._id+'/notifications')
        // res.send("invite accepted")
    } catch (err) {
        console.log(err)
    }
})

// rejecting invites
router.get('/:uid/notifications/team/invite/reject/:tid', requiredAuth, checkUser, async (req, res) => {
    try{
        const user = await User.findById({ _id: req.params.uid })
        const team = await Team.findById({ _id: req.params.tid })

        await Team.findByIdAndUpdate({ _id: req.params.tid }, {$pull: { invitedUsers: user._id }})
        await Team.findByIdAndUpdate({ _id: req.params.tid }, {$push: { unInvitedUsers: user._id }})
        await User.findByIdAndUpdate({ _id: req.params.uid }, {$pull: { invitaitionRecieved: team._id }})
        await User.findByIdAndUpdate({ _id: req.params.uid }, {$push: { invitaitionRejected: team._id }})

        req.flash('message', team.teamname +' - Team Invite Rejected Successfully')
        res.redirect('/'+user._id+'/notifications')
        // res.send("invite rejected")
    } catch (err) {
        console.log(err)
    }
})

// notifications
router.get('/:uid/notifications', requiredAuth, checkUser, async (req, res) => {
    try{
        const user = await User.findById({ _id: req.params.uid })
        const teams = []
        for (let i=0; i < user.invitaitionRecieved.length; i++) {
            const team = await Team.findOne({ _id: user.invitaitionRecieved[i] })
            teams.push(team)
        }
        res.render('notifications', { teams, message: req.flash('message') });
    } catch (err) {
        console.log(err)
    }
})

module.exports = router