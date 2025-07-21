import Project from "../models/projects.js";

export function createProject(req, res) {

  const {
    projectId,
    projectName,
    description,
    projectSummary,
    category,
    technologies,
    projectUrl,
    githubUrl,
  } = req.body;

  // Get uploaded image paths from Multer
  const imagePaths = req.files?.map((file) => `/uploads/${file.filename}`) || [];

  const project = new Project({
    projectId,
    projectName,
    description,
    projectSummary,
    category,
    technologies: Array.isArray(technologies)
      ? technologies
      : technologies.split(","), // to support both string or array
    projectUrl,
    githubUrl,
    Images: imagePaths,
  });
  console.log("Create project input:", req.body, req.files);

  project
    .save()
    .then(() => {
      res.status(201).json({
        message: "Project created",
        project,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: error.message,
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

export function getProjectById(req, res) {
  const projectId = req.params.projectId;

  Project.findOne({ projectId })
    .then((project) => {
      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }
      res.json({ project });
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message || "Failed to retrieve project",
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
}
