const express = require('express'),
      path = require('path'),
      router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname,  '../../client/build/index.html'));
});

module.exports = router;
