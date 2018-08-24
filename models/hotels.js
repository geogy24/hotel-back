var mongoose = require('mongoose');

var HotelsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    amenities: [{
        type: String
    }]
});

module.exports = mongoose.model('Hotels', HotelsSchema);