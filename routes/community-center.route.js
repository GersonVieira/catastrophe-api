const express = require('express');
const router = express.Router();
const CommunityCenterController = require('../controllers/community-center.controller.js');

router.get('/', CommunityCenterController.getCommunityCenters);
router.get('/:id', CommunityCenterController.getCommunityCenter);
router.get('/ocupation/:id', CommunityCenterController.getCommunityCenterOcupation);

router.post('/', CommunityCenterController.createCommunityCenter);

router.put('/:id', CommunityCenterController.updateCommunityCenter);

router.patch('/:id', CommunityCenterController.partialUpdateCommunityCenter);

router.delete('/:id', CommunityCenterController.deleteCommunityCenter);

router.post('/resource-trades', CommunityCenterController.tradeCommunityCenterResources);

router.get('/resource-trades/:id/log', CommunityCenterController.getCommunityCenterResourcesTradeLog);

router.get('/high-ocupation/log', CommunityCenterController.getHighOcupationCommunityCenters);

router.get('/average-resources/log', CommunityCenterController.getAverageCommunityCentersResource);

module.exports = router;