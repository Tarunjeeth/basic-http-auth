//http auth
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const port=3000;
const app=express();

var authe =false;

app.use(express.static(__dirname+"/public"));

app.use(bodyParser.urlencoded({extended:true}));

function authv(req,res,next){
    if (req.body["user"]==="shark111"){             //username 
        if (req.body["password"]==="helloworld"){       //password
            authe=true;
        }
    }
    next();
}

app.use(authv);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check",(req,res) =>{
    console.log(req.body);
    if (authe) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.listen(port,()=>{
    console.log(`Successfully connected to ${port}`);
});