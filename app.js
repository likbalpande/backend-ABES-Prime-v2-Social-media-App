require("dotenv").config();
require("./config/db");
/* 
1. resolution (internal, user-defined, external)
2. wrap it up in a IIFE (wrapper)
3. it will execute the file / code
4. it will figure out the exports
5. cache
*/

const PORT = process.env.PORT || 2700;

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { apiRouter } = require("./api/v1/routes");

const app = express();

app.use(morgan("dev")); // app level middleware --> log the request info on the terminal
app.use(express.json()); // app level middleware --> read the body in the json format for every incoming request
app.use(cookieParser()); // app level middleware --> read the cookies for every incoming request

app.use("/api/v1", apiRouter); // this apiRouter will be triggered only when request matches "/api/v1..."

app.listen(PORT, () => {
    console.log("--------- Server Started --------");
});
