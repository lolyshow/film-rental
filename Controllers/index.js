const helper = require('./helper');

let str = "";

const start = (req,res, next) =>{
    console.log(":skimp")
    // res.json([
    //     {message:"THIS is Homepage"},
    //     {message:"THIS is Homepage"},
    //     {message:"THIS is Homepage"}
    
    // ]);
    
    //  let response = helper.add(2,5);
    //  res.json({"name":response});

    // const fruits = ["apple", "orange", "cherry"];
    // fruits.forEach(recieve);
    // res.json(str);
    const array1 = [{"name":"Phillip","phone":"07035666498"}, {"name":"Phillip","Phone":"07012345678"}, {"name":"Toyin","Phone":"07035666498"}];
    array1.forEach(element => console.log(element.name));
    res.json(array1);
};


function recieve(item, index){
    let val=  index +" "+ item;
    console.log("myval",val)
    str+=val+"\n";
    // arr.push("Kiwi");
}

function add(name, title){
    return name+" "+title;
}

//GET '/tea'
const getAllTea = (req, res, next) => {
    res.json(req.body);
};

//POST '/tea'
const newTea = (req, res, next) => {
    console.log(next);
    res.json({message: "POST new tea"});
};

//DELETE '/tea'
const deleteAllTea = (req, res, next) => {
    res.json({message: "DELETE all tea"});
};

//GET '/tea/:name'
const getOneTea = (req, res, next) => {
    res.json({message: "GET 1 tea"});
};

//POST '/tea/:name'
const newComment = (req, res, next) => {
    res.json({message: "POST 1 tea comment"});
};

//DELETE '/tea/:name'
const deleteOneTea = (req, res, next) => {
    res.json({message: "DELETE 1 tea"});
};



module.exports = {
    start,
    getAllTea, 
    newTea,
    deleteAllTea,
    getOneTea,
    newComment,
    deleteOneTea
};

