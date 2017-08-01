const express = require('express'),
    router = express.Router();

router.post('/incubator', (req, res) => {
    res.send("works");
});