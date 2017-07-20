const mongoose = require('mongoose');

const incubatorSchema = mongoose.Schema({
    deviceId: {
        type: Number,
        required: true
    },
    currentTemperature: {
        type: Number,
        required: true
    },
    setTemperature: {
        type: Number,
        required: true
    },
    timeStamp: {
        type: Date,
        required: true
    }
});

const Incubator = mongoose.model('Incubator', incubatorSchema);

module.exports = Incubator;
