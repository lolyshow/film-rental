const express = require('express');

const routes = require('./routes/index');

const authRoutes = require('./routes/auth');

const mongoose = require("mongoose");
const { connect } = require('./routes/index');

require("dotenv").config({ path: `${__dirname}/.env` });

const app = express();


mongoose.connect(process.env.CONNECTIONSTRING,(err,connected)=>{

    if(err){
        console.log("Error: "+err);
        return;
    }else{
        console.log("db Connected Successfully");
    }
    
});

app.use(express.json());

app.use("/user",routes);

app.use("/api/",authRoutes);

const listener = app.listen(process.env.PORT || 3000,() => {
    console.log('App is listening on port ' +listener.address().port);
})