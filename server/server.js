require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");


corsOptions={
    origin:"http://localhost:3000",
    credentials:true,
    optionSuccessStatus:200,
}

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./config/mongoose.config');

require('./routes/truck.routes')(app);
require('./routes/user.routes')(app);
    
app.listen(process.env.PORT || 8000, () => console.log("Listening on port:", process.env.PORT));