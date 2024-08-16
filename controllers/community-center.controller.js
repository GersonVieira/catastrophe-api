const CommunityCenter = require('../models/community-center.model.js');
const CommunityCenterTrade = require('../models/community-certer-trade-log.model.js');
const CommunityCenterService = require('../services/community-center.service.js')

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
        res.status(201).json(center)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateCommunityCenter = async (req, res) => {
    try {
        const { id } = req.params;
        const center = await CommunityCenter.findByIdAndUpdate(id, req.body);
        if (!center) {
            res.status(404).json({ message: 'Community Center not found.' })
        }
        const updatedCenter = await CommunityCenter.findById(id);
        res.status(200).json(updatedCenter);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const partialUpdateCommunityCenter = async (req, res) => {
    try {
        const { id } = req.params;
        const centerDB = await CommunityCenter.findById(id);
        const center = req.body;

        if (!centerDB) {
            res.status(404).json({ message: 'Community Center not found.' })
        }
        if (!center) {
            res.status(400).json({ message: 'Bad request.' })
        }

        CommunityCenterService.setPartialUpdatedCommunityCenterModelValues(centerDB, center);

        await CommunityCenter.updateOne({ _id: id }, center);
        res.status(200).json({ message: 'Partial Update Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const tradeCommunityCenterResources = async (req, res) => {
    try {

        const firstCenter = await CommunityCenter.findById(req.body.firstCenterId);
        const secondCenter = await CommunityCenter.findById(req.body.secondCenterId);
        const firstCenterTradeResources = req.body.firstCenterTradeResources;
        const secondCenterTradeResources = req.body.secondCenterTradeResources;
        if (!firstCenter || !secondCenter) {
            res.status(404).json({ message: 'Community Center not found.' });
        } else {
            const isValidTrade = CommunityCenterService.validateTrade(firstCenter, secondCenter, firstCenterTradeResources, secondCenterTradeResources);
            if (!isValidTrade) {
                res.status(400).json({ message: 'Invalid resources trade' });
                return;
            }
            CommunityCenterService.removeTradableResource(firstCenter.resources, secondCenterTradeResources);
            CommunityCenterService.addTradableResource(secondCenter.resources, secondCenterTradeResources);
            CommunityCenterService.removeTradableResource(secondCenter.resources, firstCenterTradeResources);
            CommunityCenterService.addTradableResource(firstCenter.resources, firstCenterTradeResources);
            const isValidFistCenterResources = CommunityCenterService.validateResourcesQuantity(firstCenter.resources);
            const isValidSecondCenterResources = CommunityCenterService.validateResourcesQuantity(secondCenter.resources);
            if (!isValidFistCenterResources || !isValidSecondCenterResources) {
                res.status(400).json({ message: 'Invalid resources trade' });
                return;
            }
            const trade = req.body;
            trade.firstCenterName = firstCenter.name;
            trade.secondCenterName = secondCenter.name;
            await CommunityCenter.updateOne({ _id: firstCenter._id }, firstCenter);
            await CommunityCenter.updateOne({ _id: secondCenter._id }, secondCenter);
            await CommunityCenterTrade.create(req.body);
            res.status(200).json({ message: 'Trade successfully.' });

        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCommunityCenterOcupation = async (req, res) => {
    try {
        const { id } = req.params;
        const ocupation = await CommunityCenterService.getCommunityCenterOcupation(id);
        res.status(200).json(ocupation);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteCommunityCenter = async (req, res) => {
    try {
        const { id } = req.params;
        const center = await CommunityCenter.findByIdAndDelete(id);
        if (!center) {
            res.status(404).json({ message: 'Community Center not found.' })
        }
        res.status(200).json({ message: 'Deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getCommunityCenterResourcesTradeLog = async (req, res) => {
    try {
        const { id } = req.params;
        const initialDate = req.query.initialDate;
        const finalDate = req.query.finalDate;
        const communityCenterTrades = await CommunityCenterService.getTradesLogByDates(id, initialDate, finalDate);
        res.status(200).json(communityCenterTrades)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getHighOcupationCommunityCenters = async (req, res) => {
    try {
        const highOcupationCenters = await CommunityCenterService.getHighOcupationCommunityCenters();
        res.status(200).json(highOcupationCenters)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAverageCommunityCentersResource = async (req, res) => {
    try {
        const averageCommunityCentersResource = await CommunityCenterService.getAverageCommunityCentersResource();
        res.status(200).json(averageCommunityCentersResource)
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
    partialUpdateCommunityCenter,
    tradeCommunityCenterResources,
    getCommunityCenterOcupation,
    getCommunityCenterResourcesTradeLog,
    getHighOcupationCommunityCenters,
    getAverageCommunityCentersResource,
};