import multer from 'multer';
import path from 'path';

const Storage = multer.diskStorage({
     destination: function (req, file,cb){
         cb(null, './uploads');
     },
     filename: function(req,file,cb){
         cb(null, Date.now()+ path.extname(file.originalname))
    }

})

const uploads = multer({storage:Storage})
export default uploads;