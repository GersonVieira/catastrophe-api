const CommunityCenter = require('../models/community-center.model');
const CommunityCenterTrade = require('../models/community-certer-trade-log.model');

const resourcesValue = {
    doctor: 4,
    voluntary: 3,
    medKit: 7,
    vehicle: 5,
    foodParcel: 2,
}

const getResourcesValue = (resources) => {
    const doctorValue = (resources?.doctor ? resources.doctor : 0) * resourcesValue.doctor;
    const voluntaryValue = (resources?.voluntary ? resources.voluntary : 0) * resourcesValue.voluntary;
    const medKitValue = (resources?.medKit ? resources.medKit : 0) * resourcesValue.medKit;
    const vehicleValue = (resources?.vehicle ? resources.vehicle : 0) * resourcesValue.vehicle;
    const foodParcelValue = (resources?.foodParcel ? resources.foodParcel : 0) * resourcesValue.foodParcel;
    return doctorValue + voluntaryValue + medKitValue + vehicleValue + foodParcelValue;
}

const removeTradableResource = (resources, tradableResources) => {
    resources.doctor = resources.doctor - (tradableResources?.doctor ? tradableResources.doctor : 0);
    resources.voluntary = resources.voluntary - (tradableResources?.voluntary ? tradableResources.voluntary : 0);
    resources.medKit = resources.medKit - (tradableResources?.medKit ? tradableResources.medKit : 0);
    resources.vehicle = resources.vehicle - (tradableResources?.vehicle ? tradableResources.vehicle : 0);
    resources.foodParcel = resources.foodParcel - (tradableResources?.foodParcel ? tradableResources.foodParcel : 0);
}

const addTradableResource = (resources, tradableResources) => {
    resources.doctor = resources.doctor + (tradableResources?.doctor ? tradableResources.doctor : 0);
    resources.voluntary = resources.voluntary + (tradableResources?.voluntary ? tradableResources.voluntary : 0);
    resources.medKit = resources.medKit + (tradableResources?.medKit ? tradableResources.medKit : 0);
    resources.vehicle = resources.vehicle + (tradableResources?.vehicle ? tradableResources.vehicle : 0);
    resources.foodParcel = resources.foodParcel + (tradableResources?.foodParcel ? tradableResources.foodParcel : 0);
}

const getCommunityCenterOcupation = async (id) => {
    const center = await CommunityCenter.findById(id);
    if (!center) {
        return undefined;
    }
    return (center.currentlyOcupation * 100) / center.maxOcupation;
}

const validateTrade = async (firstCenter, secondCenter, firstCenterResources, secondCenterResources) => {
    const firstCenterResourcesValue = getResourcesValue(firstCenterResources);
    const secondCenterResourcesValue = getResourcesValue(secondCenterResources);
    const firstCenterOcupation = await getCommunityCenterOcupation(firstCenter._id);
    const secondCenterOcupation = await getCommunityCenterOcupation(secondCenter._id);

    if (firstCenterResourcesValue === secondCenterResourcesValue) {
        return true;
    }
    if (firstCenterOcupation > 90 && firstCenterResourcesValue > secondCenterResourcesValue) {
        return true;
    } else if (secondCenterOcupation > 90 && secondCenterResourcesValue > firstCenterResourcesValue) {
        return true;
    }
    return false;
}

const validateResourcesQuantity = (resources) => {
    if (resources.doctor < 0) {
        return false;
    }
    if (resources.voluntary < 0) {
        return false;
    }
    if (resources.medKit < 0) {
        return false;
    }
    if (resources.vehicle < 0) {
        return false;
    }
    if (resources.foodParcel < 0) {
        return false;
    }
    return true;

}

const getAverageCommunityCentersResource = async () => {
    const averageCommunityCentersResource = {
        doctor: 0,
        medKit: 0,
        voluntary: 0,
        foodParcel: 0,
        vehicle: 0,
    }
    const sumAllResources = await CommunityCenter.aggregate([{
        $group: {
            _id: 0, doctor: { $sum: "$resources.doctor" }, medKit: { $sum: "$resources.medKit" }, voluntary: { $sum: "$resources.voluntary" }
            , foodParcel: { $sum: "$resources.foodParcel" }, vehicle: { $sum: "$resources.vehicle" }
        }
    }]);

    const quantCenters = await CommunityCenter.countDocuments({});

    averageCommunityCentersResource.doctor = Math.round(sumAllResources[0].doctor / quantCenters);
    averageCommunityCentersResource.medKit = Math.round(sumAllResources[0].medKit / quantCenters);
    averageCommunityCentersResource.voluntary = Math.round(sumAllResources[0].voluntary / quantCenters);
    averageCommunityCentersResource.foodParcel = Math.round(sumAllResources[0].foodParcel / quantCenters);
    averageCommunityCentersResource.vehicle = Math.round(sumAllResources[0].vehicle / quantCenters);

    return averageCommunityCentersResource;
}

const getHighOcupationCommunityCenters = async () => {
    const highOcupationCenters = await CommunityCenter.aggregate([{
        $project: { name: '$name', highOcupation: { $gt: [{ $divide: [{ $multiply: ["$currentlyOcupation", 100] }, "$maxOcupation"] }, 90] }, }
    }, { $match: { "highOcupation": true } }]);
    return highOcupationCenters;
}

const setPartialUpdatedCommunityCenterModelValues = (centerDB, center) => {
    centerDB.name = center.name ? center.name : centerDB.name;
    centerDB.address = center.address ? center.address : centerDB.address;
    centerDB.location = center.location ? center.location : centerDB.location;
    centerDB.maxOcupation = center.maxOcupation ? center.maxOcupation : centerDB.maxOcupation;
    centerDB.currentlyOcupation = center.currentlyOcupation ? center.currentlyOcupation : centerDB.currentlyOcupation;
    centerDB.resources = center.resources ? center.resources : centerDB.resources;
};

const getTradesLogByDates = async (id, initialDate, finalDate) => {

    let trades = {};
    if (!initialDate || !finalDate) {
        trades = await CommunityCenterTrade.find({
            $or: [{ firstCenterId: id }, { secondCenterId: id }]
        });
    } else {
        trades = await CommunityCenterTrade.find({
            $or: [{ firstCenterId: id }, { secondCenterId: id }], $and: [{
                createdAt: {
                    $gte: finalDate,
                    $lte: initialDate
                }
            }]
        });
    }


    return trades;
}

module.exports = {
    getResourcesValue,
    getCommunityCenterOcupation,
    validateTrade,
    validateResourcesQuantity,
    addTradableResource,
    removeTradableResource,
    getAverageCommunityCentersResource,
    getHighOcupationCommunityCenters,
    getCommunityCenterOcupation,
    setPartialUpdatedCommunityCenterModelValues,
    getTradesLogByDates,
}