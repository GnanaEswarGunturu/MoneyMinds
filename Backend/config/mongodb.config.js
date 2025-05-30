const mongoose = require("mongoose");

const connectToDB = async () => {
    mongoose.connection.on("connected", () =>
        console.log("Succesfully connected to the DataBase")
    );
    await mongoose.connect(`${process.env.MONGOBD_URI}`, {
        dbName: "Auth",
    });
};

module.exports = connectToDB;
