const express = require('express'),
      router = express.Router();


router.get('/devices', (req, res) => {
    res.send("devices route works");
});

module.exports = router;
