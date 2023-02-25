const mongoose=require('mongoose')

const taskname=new mongoose.Schema({
    todo:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default : Date.now()
    }
})

module.exports=mongoose.model('Reminder',taskname)