var express = require('express'),
    router = express.Router(),
    Incubator = require('../models/incubator');

    require('../createDB');

router.post('/', function(req, res, next) {
    var incubatorStatus = new Incubator({
        deviceId: req.body.id,
        currentTemperature: req.body.curr_temp,
        setTemperature: req.body.curr_temp,
        timeStamp: new Date()
    });

    incubatorStatus.save(function(err, user, affected) {
      if (err) throw err;
      console.log("user", user);
    });

    res.send(200);
});

module.exports = router;
