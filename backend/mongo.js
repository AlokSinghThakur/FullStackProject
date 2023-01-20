const mongoose = require('mongoose')

let URL = 'mongodb://localhost:27017/projects'
const start = ()=>{
    mongoose.connect(URL)
    mongoose.connection.on(
        "error",()=>{
            console.log("Error Connecting DB")
        }
    )
    mongoose.connection.once(
        "Connection_OK",()=>{
            console.log('DB Connnected')
        }
    )
}

module.exports = {start}