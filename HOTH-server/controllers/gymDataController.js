const mongoose = require("mongoose");
const Data = require("../model/gymData");
const getGymData = async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch equipment' });
    }

};

module.exports = { getGymData }