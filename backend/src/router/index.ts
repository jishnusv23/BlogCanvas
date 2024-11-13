import { Router } from "express";
import * as authController from "../controller/userController";
// import { verifyToken } from '../Middlewares/userAuth';
import express from "express";
import * as blogController from "../controller/blogController";
import { jwtMiddleware } from "../middleware/jwtMiddleware";

const router: Router = express.Router();


router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/reset-password", jwtMiddleware, authController.resetPassword);


router.post("/add-article", blogController.addArticle);
router.get("/articles", blogController.getArticles);
router.delete("/articles/:id", blogController.deleteArticle);
router.get("/all-articles", blogController.getAllArticles);
router.post("/like-article/:id", blogController.likeArticle);
router.put("/edit-article/:id",blogController.editArticle);
router.post("/dislike-article/:id", blogController.dislikeArticle);

export default router; // Use export
