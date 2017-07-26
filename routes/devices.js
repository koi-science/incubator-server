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
            $gt: new Date().valueOf() - CONSTANTS.HOUR
        }
    }, function(error, data) {
        res.send(data);
    });
});

router.get('/device/:deviceId/dayData', (req, res) => {
    Incubator.find({deviceId: req.params.deviceId}, function(error, data) {
        res.send(data);
    });
});

router.get('/device/:deviceId/weekData', (req, res) => {
    Incubator.find({deviceId: req.params.deviceId}, function(error, data) {
        res.send(data);
    });
});

router.get('/device/:deviceId/monthData', (req, res) => {
    Incubator.find({deviceId: req.params.deviceId}, function(error, data) {
        res.send(data);
    });
});



module.exports = router;
