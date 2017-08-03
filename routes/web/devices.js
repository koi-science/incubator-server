const express = require('express'),
      router = express.Router(),
      Incubator = require('../../models/incubator'),
      Map = require('../../models/map');
      CONSTANTS = require('../../constant/index');


router.get('/devices', (req, res) => {
    Incubator.find().distinct('deviceId', function(error, deviceId) {
        res.send(deviceId);
    });
});

//TODO rewrite go get less data
router.get('/device/:deviceKey', (req, res) => {
    Incubator.find({deviceKey: req.params.deviceKey}, function(error, data) {
        res.send(data);
    });

});

//TODO search by key instead of id
router.get('/device/:deviceKey/hourData', (req, res) => {
    Map.findOne({
        deviceKey: req.params.deviceKey
    }, function (err, data) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        if (data) {
            Incubator.find({
                deviceId: data.deviceId,
                timeStamp: {
                    $gte: new Date().valueOf() - CONSTANTS.HOUR
                }
            }, function(error, data) {
                if (err) {
                    console.log(err);
                    res.send(err);
                    return;
                }
                res.send(data);
            });
            return;
        }
        res.sendStatus(404);
    });
});

router.get('/device/:deviceKey/dayData', (req, res) => {
    Map.findOne({
        deviceKey: req.params.deviceKey
    }, function (err, data) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        if (data) {
            Incubator.find({
                deviceId: data.deviceId,
                timeStamp: {
                    $gte: new Date().valueOf() - CONSTANTS.DAY
                }
            }, function(error, data) {
                if (err) {
                    console.log(err);
                    res.send(err);
                    return;
                }
                res.send(data);
            });
            return;
        }
        res.sendStatus(404);
    });
});


//TODO figure out if there is any need in this api
// router.get('/device/:deviceId/weekData', (req, res) => {
//     Incubator.find({
//         deviceId: req.params.deviceId,
//         timeStamp: {
//             $gte: new Date().valueOf() - CONSTANTS.WEEK
//         }
//     }, function(error, data) {
//         res.send(data);
//     });
// });
//
// router.get('/device/:deviceId/monthData', (req, res) => {
//     Incubator.find({
//         deviceId: req.params.deviceId,
//         timeStamp: {
//             $gte: new Date().valueOf() - CONSTANTS.MONTH
//         }
//     }, function(error, data) {
//         res.send(data);
//     });
// });
//
// router.get('/device/:deviceId/arbitraryData', (req, res) => {
//     let start = req.param.start,
//         end = req.param.end;
//
//     Incubator.find({
//         deviceId: req.params.deviceId,
//         timeStamp: {
//             $gte: start,
//             $lte: end
//         }
//     }, function(error, data) {
//         res.send(data);
//     });
// });



module.exports = router;
