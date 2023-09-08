const mongoose = require('mongoose')
 


const managementSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    managementto:{
        type:String,
        required:true
    },
    managementDate:{
        type:Date,
        required:true,
        default:Date.now
    }
})

module.exports = mongoose.model('management',managementSchema)