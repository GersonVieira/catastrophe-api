const CommunityCenter = require('../models/community-center.model.js');

const getCommunityCenters = async (req, res) => {
    try {
        const centers = await CommunityCenter.find({});
        res.status(200).json(centers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getCommunityCenter = async (req, res) => {
    try {
        const { id } = req.params;
        const center = await CommunityCenter.findById(id);
        res.status(200).json(center)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createCommunityCenter = async (req, res) => {
    try {
        const center = await CommunityCenter.create(req.body);
        res.status(200).json(center)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateCommunityCenter = async (req, res) => {
    try {
        const { id } = req.params;
        const center = await CommunityCenter.findByIdAndUpdate(id, req.body);
        if (!center) {
            res.status(404).json({message: 'Community Center not found.'})
        }
        const updatedCenter = await CommunityCenter.findById(id);
        res.status(200).json(updatedCenter);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteCommunityCenter = async (req, res) => {
    try {
        const { id } = req.params;
        const center = await CommunityCenter.findByIdAndDelete(id);
        if (!center) {
            res.status(404).json({message: 'Community Center not found.'})
        }
        res.status(200).json({message: 'Deleted successfully'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getCommunityCenters,
    getCommunityCenter,
    createCommunityCenter,
    updateCommunityCenter,
    deleteCommunityCenter,
};