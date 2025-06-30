import express from "express";
import { createProject, getProject } from "../controller/projectController.js";;

const projectRouter = express.Router();

projectRouter.post("/", createProject);
projectRouter.get("/", getProject);

export default projectRouter;