const express = require('express'),
      router = express.Router(),
      Incubator = require('../models/incubator'),
      CONSTANTS = require('../constant/index');


router.get('/devices', (req, res) => {
    Incubator.find().distinct('deviceId', function(error, deviceId) {
        res.send(deviceId);
    });
});

router.get('/device/:deviceId', (req, res) => {
    Incubator.find({deviceId: req.params.deviceId}, function(error, data) {
        res.send(data);
    });

});

router.get('/device/:deviceId/hourData', (req, res) => {
    Incubator.find({
        deviceId: req.params.deviceId,
        timeStamp: {
            $gte: new Date().valueOf() - CONSTANTS.HOUR
        }
    }, function(error, data) {
        res.send(data);
    });
});

router.get('/device/:deviceId/dayData', (req, res) => {
    Incubator.find({
        deviceId: req.params.deviceId,
        timeStamp: {
            $gte: new Date().valueOf() - CONSTANTS.DAY
        }
    }, function(error, data) {
        res.send(data);
    });
});

router.get('/device/:deviceId/weekData', (req, res) => {
    Incubator.find({
        deviceId: req.params.deviceId,
        timeStamp: {
            $gte: new Date().valueOf() - CONSTANTS.WEEK
        }
    }, function(error, data) {
        res.send(data);
    });
});

router.get('/device/:deviceId/monthData', (req, res) => {
    Incubator.find({
        deviceId: req.params.deviceId,
        timeStamp: {
            $gte: new Date().valueOf() - CONSTANTS.MONTH
        }
    }, function(error, data) {
        res.send(data);
    });
});

router.get('/device/:deviceId/arbitraryData', (req, res) => {
    let start = req.param.start,
        end = req.param.end;

    Incubator.find({
        deviceId: req.params.deviceId,
        timeStamp: {
            $gte: start,
            $lte: end
        }
    }, function(error, data) {
        res.send(data);
    });
});



module.exports = router;
