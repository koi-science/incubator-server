const mongoose = require('mongoose');

const mapSchema = mongoose.Schema({
    deviceId: {
        type: String,
        required: true
    },
    deviceKey: {
        type: String,
        required: true
    }
});

const Map = mongoose.model('Map', mapSchema);

module.exports = Map;
