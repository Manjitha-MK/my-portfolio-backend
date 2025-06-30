import Project from "../models/projects.js";

export function createProject(req, res){

    const newProductData = req.body;

    const project = new Project(newProductData);

    project.save().then(() => {
        res.json({
            message: "Project created",
        });
    }).catch((error) => {
        res.status(403).json({
            message: error,
        });
    });

}

export function getProject(req, res){
    Project.find({}).then((projects) => {
        res.json({
            projects,
        });
    });
}