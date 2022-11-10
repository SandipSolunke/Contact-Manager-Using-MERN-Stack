import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import contactRoute from "./contactRoutes.js"
import dotenv  from 'dotenv'
import bodyParser from 'body-parser';


const app=express()
const port = process.env.PORT || 3000
const CONNECTION_URL = "mongodb+srv://sandip:pass%40123@cluster0.nzsjkf4.mongodb.net/?retryWrites=true&w=majority"

//dotenv config
dotenv.config()

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true });

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("Connected with database")
})


app.use("/api/contacts",contactRoute)
app.get("/api/",(req,res)=>{
    res.send("Welcome to contact DB")
})


app.listen(process.env.PORT || 3000 , (req,res)=>{
    console.log("Trying to run server...!")
    try {
        console.log("Server is running")
    } catch (error) {
        console.log("error occured......")
        console.log(error)
    }
})
