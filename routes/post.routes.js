const express = require("express");
const upload = require("../middleware/image.upload");
const router = express.Router();
const postController = require("../controllers/post.contoller");
const auth = require("../middleware/auth");
const authMiddlewares = [auth];

router.get("/", authMiddlewares, postController.getPostsByUser)
router.post("/", authMiddlewares, upload.any(), postController.createPost)

module.exports = router;
