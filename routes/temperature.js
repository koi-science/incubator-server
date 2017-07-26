const express = require('express'),
    router = express.Router(),
    Incubator = require('../models/incubator');

    require('../createDB');

router.post('/', function(req, res, next) {
    let incubatorStatus = new Incubator({
        deviceId: req.body.id,
        currentTemperature: req.body.curr_temp,
        setTemperature: req.body.set_temp,
        timeStamp: new Date().valueOf()
    });

    incubatorStatus.save(function(err, user, affected) {
      if (err) throw err;
      console.log("user", user);
    });

    res.sendStatus(200);
});

module.exports = router;
