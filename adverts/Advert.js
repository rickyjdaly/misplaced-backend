const mongoose = require('mongoose');

var AdvertSchema = mongoose.Schema({
    title: String,
    type: String,
    image: String,
    description: String,
    category: String,
    county: String,
    town: String,
    uploaded: {type:Date, default: Date.now }
});

mongoose.model('Advert', AdvertSchema);

module.exports = mongoose.model('Advert');