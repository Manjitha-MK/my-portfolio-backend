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
    isFeatured,
  } = req.body;

  // Get uploaded image paths from Multer
  const imagePaths =
    req.files?.map((file) => `/uploads/${file.filename}`) || [];

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
    isFeatured: isFeatured || false,
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

export function getFeaturedProjects(req, res) {
  Project.find({ isFeatured: true })
    .limit(6)
    .then((projects) => {
      res.json({ projects });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
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

export async function updateProject(req, res) {
  try {
    const productId = req.params.projectId;

    let existingImages = [];
    try {
      existingImages = JSON.parse(req.body.existingImages || "[]");
    } catch (err) {
      console.error("Invalid JSON in existingImages:", err.message);
    }

    const newImages = (req.files?.newImages || []).map((file) => file.filename);
    const allImages = [...existingImages, ...newImages];

    const updatedData = {
      projectId: req.body.projectId,
      projectName: req.body.projectName,
      description: req.body.description,
      projectSummary: req.body.projectSummary,
      category: req.body.category,
      projectUrl: req.body.projectUrl,
      githubUrl: req.body.githubUrl,
      technologies: req.body.technologies,
      Images: allImages,
    };

    console.log("Updating project:", productId);
    console.log("Data:", updatedData);

    const result = await Project.updateOne(
      { projectId: productId },
      updatedData
    );

    if (result.modifiedCount === 0) {
      return res.status(200).json({ message: "No changes were made" });
    }

    res.json({ message: "Project Updated" });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}
