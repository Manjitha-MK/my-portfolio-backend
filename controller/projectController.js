import Project from "../models/projects.js";

export function createProject(req, res) {
  const newProductData = req.body;

  const project = new Project(newProductData);

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

  Product.deleteOne({ productId: projectId })
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
