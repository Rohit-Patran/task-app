const mongoose = require("mongoose");
const SCHEMA = mongoose.Schema;

const TaskSchema = new SCHEMA(
    {
        description : {
            type:String,
            required:true
        },
        completed : {
            type:Boolean,
            required:true
        }
    },
    {
        timestamps:true
    }
);


const task = mongoose.model("task",TaskSchema);
module.exports = task;
