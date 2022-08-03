const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
    username: {
        type : String,
        require: true
    },
    password: {
        type : String,
        require: true
    }
})

const userInfo = mongoose.model("userInfo",userInfoSchema);

module.exports = userInfo;