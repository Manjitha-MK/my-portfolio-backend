import Project from "../models/projects.js";

export function createProject(req, res) {
  const newProjectData = req.body;

  const project = new Project(newProjectData);

  project
    .save()
    .then(() => {
      res.json({
        message: "Project created",
      });
    })
    .catch((error) => {
      res.status(403).json({
        message: error,
      });
    });
}

export function getProject(req, res) {
  Project.find({}).then((projects) => {
    res.json({
      projects,
    });
  });
}

export function deleteProject(req, res) {
  const projectId = req.params.projectId;

  Project.deleteOne({ projectId: projectId })
    .then(() => {
      res.json({
        message: "Project deleted",
      });
    })
    .catch((error) => {
      res.status(403).json({
        message: error,
      });
    });
}

export function updateProject(req, res) {
  const productId = req.params.projectId;
  const newProjectData = req.body;

  Project.updateOne({ projectId: productId }, newProjectData)
    .then(() => {
      res.json({
        message: "Project Upadated",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
}
