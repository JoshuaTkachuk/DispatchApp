const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://joshuatkachuk530:jt63304!@cluster0.gydpssw.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('established a connection to the databse'))
    .catch(err => console.log('something went wrong' , err))