import { Router } from 'express';
import PostsController from '../controllers/postsController';
import {statisticsMiddleware} from '../middlewares/statisticsMiddleware'
import { Config } from '../config';

//router the handles the post operations
const postRouter = Router();

postRouter.get("/",statisticsMiddleware(Config.getRequestName),PostsController.getPosts)


postRouter.get("/postsnumber",PostsController.getPostsNumber)


postRouter.post("/",statisticsMiddleware(Config.createRequestName),PostsController.createPost)

export default postRouter