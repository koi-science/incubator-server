const express = require('express'),
      router = express.Router(),
      rand = require('generate-key'),

      Map = require('../../models/map'),
      registerURL = 'http://dev.koi.science:4000/register/';


router.post('/', (req, res) => {
    let deviceId = req.body.id;

    Map.findOne({
        deviceId: deviceId
    }, function(err, data) {

        if (err) {
            res.send(err);
            return
        }

        if(!deviceId) {
            res.send(404);
            return;
        }
        if (data) {

            //update entry
            Map.findOne({deviceId: deviceId }, function (err, map){
                map.deviceKey = rand.generateKey(10);
                map.activationCode = rand.generateKey(3);
                map.timeStamp = new Date().valueOf();
                map.save(function(err, map, affected) {
                    if (err) {
                        res.send(err);
                    }
                    res.send({
                        url: registerURL + map.activationCode
                    });
                });
            });

        } else {

            //create entry
            let map = new Map({
                deviceId: deviceId,
                deviceKey: rand.generateKey(10),
                activationCode: rand.generateKey(3),
                timeStamp: new Date().valueOf()
            });

            map.save(function(err, map, affected) {
                if (err) {
                    res.send(err);
                }

                res.send({
                    url: registerURL + map.activationCode
                });
            });
        }

    });
});

module.exports = router;
