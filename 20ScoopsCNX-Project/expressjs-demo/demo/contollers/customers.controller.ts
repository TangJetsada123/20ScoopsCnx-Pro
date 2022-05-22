import customers from "../models/customers.model";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

export const  registerAccount = async(req,res) => {
   
    try{
       const {first_name,last_name, email,password} = req.body; 
       
       if(!(email && password )){
         
          res.status(400).send("Input is required");
          
        }
       
       const redundantUser = await customers.findOne({ email});

       if(redundantUser){
           return res.status(409).send("User already exist.")
       }

      let encryptedPassword = "";
       encryptedPassword = await bcrypt.hash(password,10);
       
       const user = await customers.create({
           first_name,
           last_name,
           email,
           password: encryptedPassword
       })
       //create Token 
       const token = jwt.sign(
           {user_id: user._id, email},
           
           process.env.TOKEN_KEY,
           
           {
               expiresIn: "2h"
           }
       )

       user.token = token;

     return   res.status(201).json(user)

   }catch(err){
     return  res.send(err.message)
   }
}
 


export const loginAccount = async(req, res)=>{
    try{
        const {email, password} = req.body
        console.log(email,password)
        
        if(!(email && password)){
            res.status(400).send("Input is required")
        }

        const users = await customers.findOne({email});

        if(users && (await bcrypt.compare(password , users.password))){
            const token = jwt.sign(
                {user_id: users._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )
            users.token = token;
            res.status(200).json(users);
        }else{
            return res.status(400).send("Wrong Input")
        }
        

    }catch(error){
        console.log(error.message);
}

}

export const showInfo = async(req,res)=>{
        try{
            let user = await customers.find();
            res.json(user)
    
        }catch(error){
            return res.send(error.message);
        }



}
export const findNameById = async(req,res) =>{
    try{
        const id = req.params.id;
        console.log("Your Id is"+id);
        let findId = await customers.findOne({_id: id});
        res.json(findId)
    }catch(err){
        return res.send(err.message)
    }
}