const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userDetailsSchema = new mongoose.Schema({    
    userName : String,
    password : {
        type : String
    }
},{
    timestamps : true
})

userDetailsSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


const userDetails = mongoose.model("userDetails", userDetailsSchema);

module.exports = userDetails