import mongoose from 'mongoose';



export const connectDatabase = function(){
    mongoose.connect('mongodb+srv://TangJetsada:Cm620612144@cluster0.vdhr3.mongodb.net/store');
const db = mongoose.connection;
db.on("error",console.error.bind(console, "connection error:"));
db.once("open",function(){
    console.log("Connected success");
});


}



export default connectDatabase;