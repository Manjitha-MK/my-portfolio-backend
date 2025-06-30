import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    projectId : {
        type : String,
        required : true,
        unique : true
    },
    projectName : {
        type : String,
        required : true
    },
    Images : [
        {
            type : String
        }
    ],
    description : {
        type : String,
        required : true
    }
});

const Project = mongoose.model("projects",projectSchema)

export default Project