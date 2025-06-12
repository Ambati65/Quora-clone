const express = require("express");
const app = express();
let port =8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
let methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`);
});

let notes = [
    {
        id: uuidv4(),
        title: "Eat",
        content : "nothing to see here"
    },
    {
        id: uuidv4(),
        title: "Sleep",
        content : "how about no?"
    },
    {
        id: uuidv4(),
        title: "Code",
        content : "this is a great post"
    },
];

app.get("/notes",(req,res)=>{
    res.render("index.ejs",{notes});
});

app.get("/notes/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/notes",(req,res)=>{
    let id= uuidv4();
    let {title, content} = req.body;
    notes.push({id,title,content});
    res.redirect("/notes");
    res.send("note is working");
});

app.get("/notes/:id",(req,res)=>{
    let {id}=req.params;
    let note = notes.find((p)=>id===p.id);
    res.render("show.ejs",{note});
});

app.patch("/notes/:id",(req,res)=>{
    let {id}=req.params;
    let post = notes.find((p)=>id===p.id);
    let newcontent = req.body.content;
    post.content = newcontent;
    res.redirect("/notes");
});

app.get("/notes/:id/edit",(req,res)=>{
    let {id} =req.params;
    let note = notes.find((p)=>id===p.id);
    res.render("edit.ejs",{note});
});

app.delete("/notes/:id",(req,res)=>{
    let {id}=req.params;
    notes = notes.filter((p)=>id!==p.id);
    res.redirect("/notes");
});