const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const { userRoutes } = require("./routes/user");

// load the environment variables
dotenv.config();

// import the db file
require('./models/db');

// configure the port
const port = process.env.PORT || 5000

// allow access from other servers
app.use(cors());
// use express to parse request body into json
app.use(express.json());

// import swagger doc
const swaggerUi = require('swagger-ui-express'),swaggerDocument = require('./swagger.json');

// serve the documentation
app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

// add routes
app.use("/users",userRoutes);

// start the server
app.listen(port,()=>{console.log(`Server started on  ${port}`)});
