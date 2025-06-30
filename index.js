import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import projectRouter from "./router/projectRouter.js";

const app = express();

const mongoURL = "mongodb+srv://admin:123@cluster0.avtejio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use(cors());
app.use(express.json());

mongoose.connect(mongoURL,{});
const connection = mongoose.connection;

connection.once("open", ()=>{
    console.log("Database Connected");
});

app.use("/api/projects", projectRouter);

app.listen(5000, () => {
    console.log("server is running on port 5000");
})