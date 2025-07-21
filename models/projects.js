import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  projectId: {
    type: String,
    required: true,
    unique: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  Images: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  projectSummary: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  projectUrl: {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  githubUrl: {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        return !v || /^https?:\/\/(www\.)?github\.com\/.+/.test(v);
      },
      message: (props) => `${props.value} is not a valid GitHub URL`,
    },
  },
});

const Project = mongoose.model("projects", projectSchema);

export default Project;
