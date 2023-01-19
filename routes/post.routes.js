const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.contoller");
const auth = require("../middleware/auth");
const authMiddlewares = [auth];

router.get("/", authMiddlewares, postController.getPostsByUser)
router.post("/", authMiddlewares, postController.createPost)

module.exports = router;
