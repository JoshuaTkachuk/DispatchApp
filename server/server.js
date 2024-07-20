require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");

corsOptions={
    origin:"http://localhost:3000",
    credentials:true,
    optionSuccessStatus:200,
    methods: ["GET", "POST", "PUT", "DELETE"]
}

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./config/mongoose.config');

require('./routes/truck.routes')(app);
require('./routes/user.routes')(app);

const httpServer = createServer(app);
//const httpServer = app.listen(process.env.PORT, () => {console.log(`Server listening on port ${process.env.PORT}`)});
const io = new Server(httpServer, {
    cors:{
        origin:"http://localhost:3000"
    }
});
//const io = new Server(httpServer);

io.on("connection", (socket) =>{
    console.log("socket connected")
    
})

httpServer.listen(8000, ()=> {console.log("listening on 8000")});
