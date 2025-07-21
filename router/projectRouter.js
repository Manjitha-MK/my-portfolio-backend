import express from "express";
import {
  createProject,
  deleteProject,
  getProject,
  getProjectById,
  updateProject,
} from "../controller/projectController.js";
import upload from "../middleware/upload.js";
const projectRouter = express.Router();

// projectRouter.post("/", createProject);
projectRouter.get("/", getProject);
projectRouter.get("/:projectId", getProjectById);
projectRouter.put(
  "/:projectId",
  upload.fields([{ name: "newImages", maxCount: 5 }]),
  updateProject
);
projectRouter.delete("/:projectId", deleteProject);
projectRouter.post("/", upload.array("images", 5), createProject);

export default projectRouter;
