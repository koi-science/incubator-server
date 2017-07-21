const express = require('express'),
      router = express.Router(),
      Incubator = require('../models/incubator');


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

module.exports = router;
