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

        if (!data) {
            res.send('Invalid activation code error', 404);
        }

        // send 404 in expired code case
        if ( new Date().valueOf() - data.timeStamp > CONSTANTS.EXPIRATION_PERIOD) {
            res.send('Activation code expired error', 404);
            return;
        }

        //redirect in valid code case
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();

    });
});

module.exports = router;
