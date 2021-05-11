const model = require('../models');
const multer = require('multer');

//to store image in uploads folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

//filter to check the type of file uploaded 
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

//final upload function called in post method
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
        //50MB
    },
    fileFilter: fileFilter
});

module.exports =  { upload }; 

// router.get("/",async (req,res)=>{
//     try
//     {
//         const allImages=await Image.find()
//         res.json(allImages)
//     }
//     catch(err)
//     {
//         return err
//     }


// })

// router.post("/",upload.single('imageData'), (req, res, next) =>{

//     //new image object being created
//         const newImage = new Image({
//             imageData: req.file.path
//         });

//         //saving new image
//         newImage.save()
//             .then((result) => {
//                 console.log(result);
//                 res.status(200).json({
//                     success: true,
//                     document: result
//                 });
//             })
//             .catch((err) => next(err));
// });
    

//module.exports = router;