import mongoose, {Mongoose} from "mongoose";

const bookSchema = new mongoose.Schema({
    name: String,
    genre: String
});


const books = mongoose.model("book", bookSchema);

export default books;