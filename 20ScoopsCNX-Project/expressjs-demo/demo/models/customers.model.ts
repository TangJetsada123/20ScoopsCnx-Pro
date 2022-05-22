import mongoose, {Mongoose} from "mongoose";

const customerSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {type:String, unique:true },
    password: {type:String},
    token:{type:String}

});

const customers = mongoose.model("user", customerSchema);

export default customers;