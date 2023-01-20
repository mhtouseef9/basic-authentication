const multer = require("multer");

console.log("here----1")
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})
console.log("here----2")
const imageUpload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000, // 1000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            // upload only png, jpeg and jpg format
            return cb(new Error("Only images allowed"));
        }
        cb(undefined, true);
    },
});
//
// imageUpload(req, res, (err) => {
//     if (err) {
//         if (err.message) {
//             return {
//                 success: 0,
//                 msg: err.message
//             };
//         }
//         return {
//             success: 0,
//             msg: "Image not uploaded!"
//         };
//     }
//     return {
//         success: 1,
//         msg: req.file
//     };
// });

module.exports = imageUpload;
