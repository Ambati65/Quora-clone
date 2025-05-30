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

let posts = [
    {
        id: uuidv4(),
        username: "rahul",
        content : "nothing to see here"
    },
    {
        id: uuidv4(),
        username: "sumanth",
        content : "how about no?"
    },
    {
        id: uuidv4(),
        username: "prakash",
        content : "this is a great post"
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let id= uuidv4();
    let {username, content} = req.body;
    posts.push({id,username,content});
    res.redirect("/posts");
    res.send("post is working");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p)=>id===p.id);
    let newcontent = req.body.content;
    post.content = newcontent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} =req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});