const mongoose = require('mongoose');

// connect mongotbd
module.exports.connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGOBD_URL)
        console.log("connect success");
    } catch (error) {
        console.log("connect error");
    }
}

