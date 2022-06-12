const { exist } = require("joi");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {}, (error) => {
    if (error) {
        exist(1);
    }
    console.log("Connected to db");
}
)