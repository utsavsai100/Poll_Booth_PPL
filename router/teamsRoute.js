const express = require("express");
const router = new express.Router();

const mongoose = require('mongoose');
const DB = process.env.DATABASE
require('../db/mongoose');

const User = require("../models/userSchema");
const Team = require("../models/teamsSchema");
const Poll = require("../models/pollsSchema");

const { requiredAuth, checkUser } = require("../auth/authMiddleware.js")

// create teams page
router.get('/:uid/createteams', requiredAuth, checkUser, async (req, res) => {
    const usersData = await User.find({})
    res.render('createteams', { usersData, message: req.flash('message') })
})

// to create teams
router.post('/:uid/createteams', async (req, res) => {
    const user = await User.findById({ _id: req.params.uid })
    const { teamname, admin, createdon } = req.body;
    // console.log(teamname + " " + admin + " " + createdon)
    // console.log(user._id)

    if (!teamname || !admin || !createdon) {
        req.flash('message', 'Please fill all the fields')
        res.redirect('/'+user._id+'/createteams')
        // return res.status(422).json({ error: "Please fill all the fields" })
    }

    try {
        const teamExist = await Team.findOne({ teamname: teamname })

        if (teamExist) {
            req.flash('message', 'This team already exists. Please choose a different name!')
            res.redirect('/'+user._id+'/createteams')
            // return res.status(422).json({ error: "This team already exists. Please choose a different name!" })
        } else {
            
            // user creating the team is part of the team
            const teamMembers = [user._id]
            
            const team = new Team({ teamname, admin, createdon, teamMembers })

            const teamRegistered = await team.save();

            if (teamRegistered) {
                await User.findByIdAndUpdate({ _id: req.params.uid }, {$push: { teams: teamname }})
                
                req.flash('message', 'Team Created Successfully')
                res.redirect('/'+user._id+'/teams')
                // res.status(201).json({ message: "Team Created Successfully" });
            } else {
                req.flash('message', 'Failed to create this team')
                res.redirect('/'+user._id+'/createteams')
                // res.status(500).json({ error: "Failed to create this team" })
            }
        }
    } catch (err) {
        console.log(err)
    }
})

// your teams page
router.get('/:id/teams', requiredAuth, checkUser, async (req, res) => {
    const user = await User.findOne({ _id: req.params.id })
    const teamsData = []
    for (let i = 0; i < user.teams.length; i++) {
        var team = await Team.findOne({ teamname: user.teams[i] })
        teamsData.push(team)
    }
    // const user = await User.find({ user.teams: req.params.id })
    res.render('yourteams', { user, teamsData, message: req.flash('message') })
})

// team details
router.get('/teams/details/:id', requiredAuth, checkUser, async (req, res) => {
    try {
        const team = await Team.findOne({ _id: req.params.id })
        const teammembers = await User.find({ teams: team.teamname })
        const invitaitionRecieved = await User.find({ invitaitionRecieved: team._id })
        const usersData = await User.find({})

        const invitaitionRejected = usersData

        for (let i = 0; i < invitaitionRecieved.length; i++) {
            invitaitionRejected.forEach((ele, index) => {
                if (ele._id == invitaitionRecieved[i].id) {
                    invitaitionRejected.splice(index, 1)
                }
            })
        }
        for (let i = 0; i < teammembers.length; i++) {
            invitaitionRejected.forEach((ele, index) => {
                if (ele._id == teammembers[i].id) {
                    invitaitionRejected.splice(index, 1)
                }
            })
        }

        res.render('teamdetails', { team, teammembers, invitaitionRecieved, usersData, invitaitionRejected, message: req.flash('message') })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router