const express = require('express')
const router = express.Router()
const db = require('../models')

// GET /bounty -- return array of all bounties
router.get('/', async (req, res) => {
    try {
        // find all bounties
        const bounties = await db.Bounty.find({})
        // send them back as json (w/default status code 200)
        res.json(bounties)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

// GET /bounty/:id -- return a single bounty 
router.get('/:id', async (req, res) => {
    try {
        // get a specific id from the req.params.id
        // look up that id in the database
        const bounty = await db.Bounty.findById(req.params.id)
        // send the found bounty back as json
        res.json(bounty)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})


// POST /bounty -- create a new bounty in the db
router.post('/', async (req, res) => {
    try {
        const newBounty = await db.Bounty.create(req.body)
        res.status(201).json(newBounty)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

// PUT /bounty/:id -- update a single bounty
router.put('/:id', async (req, res) => {
    try {
        // getting the id from the url route parameters
        // getting the data to update from the request body
        // ensuring that the query returns the new values with the options object
        const options = { new: true }
        const updatedBounty = await db.Bounty.findByIdAndUpdate(req.params.id, req.body, options)
        res.json(updatedBounty)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

// DELETE /bounty/:id -- destroy a bounty
router.delete('/:id', async (req, res) => {
    try {
        // get the id from the url route parameters
        // delete that thing with that id
        await db.Bounty.findByIdAndDelete(req.params.id)
        // status 204 -- no content (we cannot send and json data back with this status)
        // you could also send the deleted item back or you could redirect to GET /bounty
        res.sendStatus(204)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'internal server error' })
    }
})

module.exports = router