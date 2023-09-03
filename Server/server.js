const express = require("express");
const path = require("path");
global.dotenv = require("dotenv").config({
  path: path.join(__dirname, "../../.env"),
});
const db = require("./Core/database/db");

const userRoute = require("./Core/routes/userRoutes"),
  roleRoute = require("./Core/routes/roleRoutes"),
  authRoute = require("./Core/routes/authRoutes"),
  adminRoute = require("./Core/routes/adminRoutes"),
  gamesRoute = require("./Core/routes/gamesRoutes"),
  sujetsRoute = require("./Core/routes/sujetsRoutes"),
  contactRoute = require("./Core/routes/contactRoutes"),
  testimonialsRoute = require("./Core/routes/testimonialsRoutes");

const cors = require("cors"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser");

const app = express();

app
  .use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  )
  .use(cookieParser())
  .use(express.json({ limit: "50mb" }))
  .use(
    express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
  )
  .use(
    express.json(),
    userRoute,
    roleRoute,
    authRoute,
    adminRoute,
    gamesRoute,
    sujetsRoute,
    contactRoute,
    testimonialsRoute
  );

db.connect();

app.listen(process.env.PORT, () => {
  console.log("Server is running on port" + process.env.PORT);
});
