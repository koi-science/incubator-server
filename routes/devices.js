const express = require('express'),
      router = express.Router(),
      Incubator = require('../models/incubator');


router.get('/devices', (req, res) => {
    Incubator.find().distinct('deviceId', function(error, deviceId) {
        res.send(deviceId);
    });
});

module.exports = router;
