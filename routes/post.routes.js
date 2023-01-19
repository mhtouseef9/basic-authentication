const express = require("express");
const postController = require("../controllers/post.contoller");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, postController.getPostsByUser)
router.post("/", auth,  postController.createPost)
// router.post("/login", userController.login)

module.exports = router;
