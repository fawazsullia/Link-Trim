const express = require('express');
const cors = require('cors');
require('dotenv').config()


const app = express();
const allRoutes = require('./routes/allRoutes.js')

// require db connection
require('./db/connection');

// Assigning Port 
const port = process.env.PORT || 3000;

//app.use(cors({origin : "https://abhay0809.github.io/Link-Trim/"}))
app.use(express.json())


//Routes middleware
app.use('/', allRoutes)






app.listen(port,()=>{
    console.log(`Connection is setup at ${port}`);
});