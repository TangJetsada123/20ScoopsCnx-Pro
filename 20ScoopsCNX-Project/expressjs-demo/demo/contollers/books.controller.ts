import bookModel from "../models/books.model";
import express,{Express,NextFunction,request,Request,response, Response} from "express";
import imageModel from "../models/upload.model";

//query string filter with name
export const queryName= async(req, res)=>{
        const userName = req.query.name;
        if(userName){
                try{
                    let findName = await bookModel.find({name: {$regex : String(userName).toUpperCase().toLowerCase()}})
                    res.json(findName)
                }catch(error){
                    return res.send(error.message)
                }
        }else{
            try{
                let findBook = await bookModel.find();
                res.json(findBook)
            }catch(error){
                return res.send(error.message)
            }
            
            // let findOneBook = bookModel.find()
            // .then((book)=> res.json(book))
            // .catch((error) => {
            //     res.status(500).send({ message: error.message });
            // });
        }
};

export const findById = async(req: Request, res: Response) => {
        try{
            const id = req.params.id;
            console.log("Your Id is " + id);
            let findId = await bookModel.findOne({_id: id})
                // .then((book) => res.json(book))
                // .catch((error) => {
                //     res.status(500).send({message: error.message});
                // });
                res.json(findId);
        }catch(error){
            return res.send(error.message);
        }
};


export const addBooks = async(req, res)=>{
    try{
        const payLoad = req.body;
        const book = await new bookModel(payLoad);
        book.save();
        res.json(payLoad);
    }catch(error){
        return res.send(error.message);
    }
    
    
};

//update
export const updateBooks = async(req, res)=>{
    const bookId = req.params._id;
    const bookName = req.body;

    try{
        const updateBook = await bookModel.findById(bookId);
        Object.assign(updateBook,bookName);
        updateBook.save();    
        res.send({ data: updateBook});
    }catch{
        res.status(404).send({error: "Error"});
    }

};

//delete
export const deleteBooks = async(req: Request, res: Response) =>{
        try{
            const bookId   = req.params._id;
            console.log(bookId);
            await bookModel.deleteMany({_id: bookId}).exec()
            res.status(204).send("Delete")
        }catch(error){
            return res.send(error.message);
        }


}

export const uploadFiles = async(req, res) =>{
    const payLoad = req.files;
    const result = [];
    try{
        
        for(let i=0;i<payLoad.length;i++){
            let image = new imageModel(payLoad[i]);
            const images = await image.save();
            result.push(images);
            
                // throw new Error("Hello");
 }
    }catch(err){
        console.log(err)
        return res.send(err.message)
    }
    console.log(result)
    res.json(result)
}



