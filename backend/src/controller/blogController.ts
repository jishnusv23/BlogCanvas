    import { NextFunction, Request, Response } from "express";
    import Article from "../models/blogsMOdels";

    import dotenv from "dotenv";

    import User from "../models/userModels";

    import { deleteImageCloudinary } from "../utils/cloudinary/remove";
    dotenv.config();

    interface IArticle {
      _id: any;
      id: string;
      title: string;
      content: string;
      date: Date;
      description: string;
      image: File | null;
      tags: string[];
      category: string;
    }

    export const addArticle = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        console.log(req.body.image);

        const result = await Article.create(req.body);

        console.log(result);

        res.status(201).json({
          success: true,
          message: "Article created successfully",
        });
      } catch (error) {
        next(error);
      }
    };

    export const getArticles = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const userId = req.query.userId as string;

        const articles: IArticle[] = await Article.find({ id: userId })
          .lean()
          .exec();

        res.status(200).json({
          success: true,
          message: "Articles fetched successfully",
          data: articles,
        });
      } catch (error) {
        console.error("Error fetching articles:", error);
        next(error);
      }
    };

    export const deleteArticle = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const articleId = req.params.id;
        console.log("article Id", articleId);

        const findArticle = await Article.findOne({ _id: articleId });
        console.log(findArticle);
        if (!findArticle) {
          res.status(404).json({ message: "Article not found" });
          return;
        }

        await deleteImageCloudinary(findArticle.image);

        const result = await Article.findByIdAndDelete({ _id: articleId });

        console.log(result);

        res.status(200).json({
          success: true,
          message: "Article deleted successfully",
        });
      } catch (error) {
        console.error("Error fetching articles:", error);
        next(error);
      }
    };

    export const getAllArticles = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const articles: IArticle[] = await Article.find({}).lean();

        const articlesWithAuthor = await Promise.all(
          articles.map(async (article) => {
            let authorName = "Unknown Author";
            if (article.id) {
              const user = await User.findById(article.id)
                .select("firstName")
                .lean();
              if (user) {
                authorName = user.firstName;
              }
            }
            return {
              ...article,
              author: authorName,
            };
          })
        );

        res.status(200).json({
          success: true,
          message: "Articles fetched successfully",
          data: articlesWithAuthor,
        });
      } catch (error) {
        console.error("Error fetching articles:", error);
        next(error);
      }
    };

    export const likeArticle = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const articleId = req.params.id;
        const userId = req.body.userId;

        const findArticle = await Article.findById({ _id: articleId });

        if (!findArticle) {
          res.status(404).json({ message: "Article not found" });
          return;
        }
        const likedIndex = findArticle.likes.indexOf(userId);
        const dislikedIndex = findArticle.dislikes.indexOf(userId);
        if (likedIndex !== -1) {
          findArticle.likes.splice(likedIndex, 1);
          await findArticle.save();

          res.status(200).json({
            success: true,
            message: "Unliked successfully",
          });
        } else {
          if (dislikedIndex !== -1) {
            findArticle.dislikes.splice(dislikedIndex, 1);
          }

          findArticle.likes.push(userId);
          await findArticle.save();

          res.status(200).json({
            success: true,
            message: "Liked successfully",
          });
        }
      } catch (error) {
        console.error("Error liking/unliking article:", error);
        next(error);
      }
    };

    export const dislikeArticle = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const articleId = req.params.id;
        const userId = req.body.userId;

        const findArticle = await Article.findById({ _id: articleId });

        if (!findArticle) {
          res.status(404).json({ message: "Article not found" });
          return;
        }

        const dislikedIndex = findArticle.dislikes.indexOf(userId);
        const likedIndex = findArticle.likes.indexOf(userId);

        if (dislikedIndex !== -1) {
          findArticle.dislikes.splice(dislikedIndex, 1);
          await findArticle.save();

          res.status(200).json({
            success: true,
            message: "Undisliked successfully",
          });
        } else {
          if (likedIndex !== -1) {
            findArticle.likes.splice(likedIndex, 1);
          }

          findArticle.dislikes.push(userId);
          await findArticle.save();

          res.status(200).json({
            success: true,
            message: "Disliked successfully",
          });
        }
      } catch (error) {
        console.error("Error disliking/undisliking article:", error);
        next(error);
      }
    };
    export const blockArticle = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const articleId = req.params.id;
        const userId = req.body.userId;

        const findArticle = await Article.findById({ _id: articleId });

        if (!findArticle) {
          res.status(404).json({ message: "Article not found" });
          return;
        }

        const blockedIndex = findArticle.blocks.indexOf(userId);
        const likedIndex = findArticle.likes.indexOf(userId);
        const dislikedIndex = findArticle.dislikes.indexOf(userId);
        if (blockedIndex !== -1) {
          findArticle.blocks.splice(blockedIndex, 1);
          await findArticle.save();

          res.status(200).json({
            success: true,
            message: "Unblocked successfully",
          });
        } else {
          if (likedIndex !== -1) {
            findArticle.likes.splice(likedIndex, 1);
          }

          if (dislikedIndex !== -1) {
            findArticle.dislikes.splice(dislikedIndex, 1);
          }

          findArticle.blocks.push(userId);
          await findArticle.save();

          res.status(200).json({
            success: true,
            message: "Blocked successfully",
          });
        }
      } catch (error) {
        console.error("Error blocking/unblocking article:", error);
        next(error);
      }
    };

    export const blockedArticle = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const userId = req.query.userId as string;
        console.log("user", userId);

        const blockedArticles: IArticle[] = await Article.find({
          blocks: userId,
        });

        console.log(blockedArticles);

        console.log("hello");

        res.status(200).json({
          success: true,
          message: "Blocked articles fetched successfully",
          data: blockedArticles.map((article) => ({
            id: article._id,
            title: article.title,
            description: article.description,
          })),
        });
      } catch (error) {
        console.error("Error fetching blocked articles:", error);
        next(error);
      }
    };

    export const unblockArticle = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const articleId = req.params.id;
        const userId = req.body.userId;

        console.log("Unblocking article:", articleId, "for user:", userId);

        const findArticle = await Article.findById(articleId);

        if (!findArticle) {
          res.status(404).json({ message: "Article not found" });
          return;
        }

        if (findArticle.blocks && findArticle.blocks.includes(userId)) {
          findArticle.blocks = findArticle.blocks.filter(
            (id) => id.toString() !== userId
          );

          await findArticle.save();

          res.status(200).json({
            success: true,
            message: "Article unblocked successfully",
          });
        } else {
          res.status(400).json({
            success: false,
            message: "User is not blocked for this article",
          });
        }
      } catch (error) {
        console.error("Error unblocking article:", error);
        next(error);
      }
    };