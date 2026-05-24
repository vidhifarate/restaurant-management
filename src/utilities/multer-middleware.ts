
// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer ({
//   storage: storage,
//   limits:{
//     fileSize:1 * 1024 * 1024  //1MB
//   }
// }).single('profile-picture');

// // // function checkFileType(file: Express.Multer.File, cb: Function) {
// // //   const filetypes = /jpeg|jpg|png/;
// // //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

// // //   if (extname) {
// // //     return cb(null, true);
// // //   } else {
// // //     cb('Error: Images only! (jpeg, jpg, png)');
// // //   }
// // // }

// // // const multerMiddleware=(req:Request,res:Response,next:NextFunction)=>{
// // //   // upload(req, res, function (err) {
// // //   //   if (err instanceof multer.MulterError) {
// // //   //     return res.status(400).json({ error: err.message });
// // //   //   } else if (err) {
// // //   //     return res.status(400).json({ error: err.message });
// // //   //   }
// // //   //   next();
// // //   // }); 
// // // }
// // // export default multerMiddleware;

// // import multer from "multer";
// // import path from "path";

// // const storage = multer.diskStorage({
// // destination: (req, file, cb) => {
// // cb(null, "src/uploads");
// // },

// // filename: (req, file, cb) => {
// // const uniqueName =Date.now() +"-" +Math.round(Math.random() * 1e9) +path.extname(file.originalname);
// // cb(null, uniqueName);
// // }
// // });

// // // const fileFilter:multer.Options["fileFilter"] =(req, file, cb) => {
// // // if (file.mimetype.startsWith("image/")) {
// // // cb(null, true);
// // // } else {
// // // cb(new Error("Only image files allowed"));
// // // }
// // // };


// // const upload = multer({storage,
// // limits: {
// //   fileSize: 5 * 1024 * 1024},
// // // fileFilter: fileFilter
// // });

// // export {
// // upload
// // };



// import type { NextFunction, Request, Response } from "express";
// import multer from "multer";
// import path from "path";

// const storage =multer.diskStorage({
//    destination: (req, file, cb) => {
//     cb(null, 'uploads/')
// },
// filename:(req,file,cb)=>{
//   cb(null,Date.now()+'-'+file.originalname);
// }
// });

// function checkFileType(file: Express.Multer.File, cb: Function) {
//   const filetypes = /jpeg|jpg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
// }

// const upload = multer({storage:storage});

// const multerMiddleware=(req:Request,res:Response,next:NextFunction)=>{
// upload= 

// }


import type { Request } from "express";
import multer from "multer";


const storageProfilePicture=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,"src/uploads/profile-pictures");
    },
    filename: function (req, file, cb) {
        const uniqueName =Date.now()+"-"+file.originalname;
        cb(null, uniqueName);
    },
});
const storageMenuPictures=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,"src/uploads/menu");
    },
    filename: function (req, file, cb) {
        const uniqueName =Date.now()+"-"+file.originalname;
        cb(null, uniqueName);
    },
});


const fileFilter=(req:Request,file:Express.Multer.File,cb:Function) => {
    const allowedTypes=["image/png","image/jpeg","image/jpg"];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("only image files are  allowed"));
    }
};

export const upload=multer({
    storage:storageProfilePicture,
    limits:{
        fileSize: 10000000,
    },
    fileFilter,
});

export const uploadMenu=multer({
    storage:storageMenuPictures,
   
    fileFilter,
});

export default {upload,uploadMenu};