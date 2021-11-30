const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/misplaced', { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.connect('mongodb+srv://ricky:a3scpdxa@cluster0.2gwlw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })