const express = require('express'),
    router = express.Router(),
    Incubator = require('../../models/incubator');

router.post('/', function(req, res, next) {
    let incubatorStatus = new Incubator({
        deviceId: req.body.id,
        currentTemperature: req.body.curr_temp,
        setTemperature: req.body.set_temp,
        timeStamp: new Date().valueOf()
    });

    incubatorStatus.save(function(err, user, affected) {
      if (err) console.log("err", err);
    });

    res.sendStatus(200);
});

module.exports = router;
