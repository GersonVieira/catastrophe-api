const express = require('express');
const router = express.Router();
const CommunityCenterController = require('../controllers/community-center.controller.js');

router.get('/', CommunityCenterController.getCommunityCenters);
router.get('/:id', CommunityCenterController.getCommunityCenter);

router.post('/', CommunityCenterController.createCommunityCenter);

router.put('/:id', CommunityCenterController.updateCommunityCenter);

router.delete('/:id', CommunityCenterController.deleteCommunityCenter);

module.exports = router;