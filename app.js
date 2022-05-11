const express = require("express");
const mongoose = require("mongoose");
const TASK = require("./models/task_model");
const app = express();

const port = process.env.PORT || 3000

//mongoose connection for MongoDB database
const dbURL = "mongodb://localhost:27017/TASKS";
mongoose.connect(dbURL)
    .then(result => {
        //listen to port
        app.listen(port,()=>{
        console.log("listening to port 3000");
        })
    })
    .catch(err => {
        console.log(err);
    });

//parsing body
app.use(express.urlencoded({extended:true}));

//view engine set
app.set("view engine","ejs");

//connecting to css file
app.use(express.static("public"));

//home page
app.get("/",(req,res)=>{
    TASK.find({completed:false})
        .then(result => {
            console.log(result);
            res.render("index",{ heading:"tasks", tasks:result });
        })
        .catch(err => {
            console.log(err);
        });
});

//form for creating task
app.get("/create-task",(req,res)=>{
    res.render("create_task",{ heading:"create task" });
});

//saving new task to database
app.post("/task-create",(req,res) => {
    const task= new TASK(req.body);
    task.save();
    res.redirect("/");
});

//details of one task
app.get("/task-details/:id",(req,res)=>{
    const id = req.params.id
    TASK.findById(id)
        .then(result=> {
            res.render("details",{ heading:"details" , task:result });
        })
        .catch(err => {
            console.log(err);
        });
});

//form pre-filled with data for task updation
app.get("/update-task/:id",(req,res) => {
    const id = req.params.id;
    TASK.findById(id)
        .then(result => {
            res.render("update_task",{ heading:"update task" , content : result });
        })
        .catch(err => {
            console.log(err)
        });
});

//updating task and save to database
app.post("/task-update/:id",(req,res) => {
    const id = req.params.id;
    TASK.findByIdAndUpdate(id,req.body)
        .then(result => {
           res.redirect("/");
        })
        .catch(err => {
            console.log(err);
        });
});


//delete task
app.delete("/delete-task/:id",(req,res) => {
    const id = req.params.id;
    TASK.findByIdAndDelete(id)
        .then(result =>{
            res.json({redirect:"/"});
        })
        .catch(err =>{ 
            console.log(err);
        });
});

//404 page
app.use((req,res) => {
    res.status = 404;
    res.render("404",{ heading : "404 PAGE NOT FOUND" });
});
