const express = require('express'),
      path = require('path'),
      router = express.Router(),
      Map = require('../../models/map'),
      CONSTANTS = require('../../constant/index');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname,  '../../client/build/index.html'));
});

router.get('/register/:id', function(req, res, next) {
    Map.findOne({
        activationCode: req.params.id
    }, function (err, data) {
        if (err) {
            res.send(err);
            return;
        }

        // send 404 in expired code case
        if (!data || (new Date().valueOf() - data.timeStamp > CONSTANTS.EXPIRATION_PERIOD) ) {
            res.send('Activation code expired error', 404);
            return;
        }

        //redirect in valid code case
        console.log(data);
        res.writeHead(302, {
            'Location': '/incubator/' + data.deviceKey
        });
        res.end();

    });
});

module.exports = router;
