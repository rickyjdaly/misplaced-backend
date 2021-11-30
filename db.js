const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/misplaced', { useUnifiedTopology: true, useNewUrlParser: true });