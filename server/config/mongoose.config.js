const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://joshuatkachuk530:Q0R0gxtGYXFnV16V@cluster1.b4viamo.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('established a connection to the databse'))
    .catch(err => console.log('something went wrong' , err))