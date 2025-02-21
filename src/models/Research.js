import mongoose from "mongoose";

const researchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    doi : {
        type: String,
        required: true
    },
}, { timestamps: true }
);

const Research = mongoose.model("Research", researchSchema);

export default Research;