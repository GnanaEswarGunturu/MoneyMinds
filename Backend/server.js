const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv/config");
const conncetToDB = require("./config/mongodb.config.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true }));
conncetToDB();

port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        console.log("Error Occured while connecting to the server", err);
    }

    console.log(`App is running on the port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
