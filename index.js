var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var Storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, "./Images");
    },
    filename: function(req, file, callback){
        callback(null, file.fieldname + "_"+ Date.now() + "_" + file.originalname)
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 3);

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/upload", function(req, res){
    upload(req, res, function(err){
        if(err){
            return res.end("Error", err)
        }
        return res.end("File uploaded successfully");
    })
})

app.listen(3333, ()=>{
    console.log("Server started on port 3333");
})