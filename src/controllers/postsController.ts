import { Request, Response, NextFunction} from 'express';
import { postDAL } from '../models/postModel';

//Post controller manage get, create and get number of posts
export default class PostController {

    //create post
    public static createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const createdPost = await new postDAL(req.body).save();
            res.status(201).json(createdPost);
            next();
        }
        catch(err){
            res.status(500).json("Failed create post")
        }
    }

    //get posts, can handle pagination with skip and limit params
    public static getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{
        try{
            const {start,limit} = req.query;
            let queriedPosts = {}
            if(start && limit)
                queriedPosts = await postDAL.find({}).sort({createdAt:"asc"}).skip(parseInt(start as string)).limit(parseInt(limit as string)).populate("createdBy")
            else {
                queriedPosts = await postDAL.find({}).sort({createdAt:"asc"}).populate("createdBy")
            }
            res.json(queriedPosts);
            next();
        }
        catch(err){
            res.status(500).json("Failed to get posts")
        }
    }
    
    //returns the posts number
    public static getPostsNumber = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const amountOfPosts = await postDAL.estimatedDocumentCount();
            res.json(amountOfPosts);
            next();
        }
        catch(err){
            res.status(500).json("Failed to get posts number");
        }
    }
}

