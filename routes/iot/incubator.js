const express = require('express'),
      router = express.Router(),
      rand = require('generate-key');

      Map = require('../../models/map');


router.post('/', (req, res) => {
    let deviceId = req.body.id,
        deviceKey;

    Map.findOne({
        deviceId: deviceId
    }, function(error, data) {
        if (data) {
            deviceKey = data.deviceKey;
        } else {

            let key = rand.generateKey(10);
            let map = new Map({
                deviceId: deviceId,
                deviceKey: key
            });

            map.save(function(err, map, affected) {
                if (err) console.log("err", err);
                console.log("map", map);
            });
        }
    });
    res.sendStatus(200);
});

module.exports = router;
