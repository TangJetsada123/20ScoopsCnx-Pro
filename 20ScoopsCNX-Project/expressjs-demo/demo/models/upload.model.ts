import mongoose from "mongoose";

const imgSchema = new mongoose.Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size:  Number,
});

const imageModel = mongoose.model("image",imgSchema);

export default imageModel;