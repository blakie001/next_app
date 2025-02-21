import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    sub_services: [
        {
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            technologies: {
                type: [String],
                default: []
            },
        }
    ]
},
    {timestamps: true}
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
