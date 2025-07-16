import express from "express";
import { createProject, deleteProject, getProject, getProjectById, updateProject } from "../controller/projectController.js";;

const projectRouter = express.Router();

projectRouter.post("/", createProject);
projectRouter.get("/", getProject);
projectRouter.get("/:projectId", getProjectById);
projectRouter.put("/:projectId",updateProject);
projectRouter.delete("/:projectId",deleteProject);

export default projectRouter;