import { Request, Response, NextFunction} from 'express';
import { postDAL } from '../models/postModel';
import { userDAL } from "../models/usersModel"
import { statisticsDAL } from '../models/statisticsModel';

//statistics controller manages get top ten posts creators and get runtimes
export default class StatisticsController {

    //returns the top ten creators that made the most posts
    public static getTopTenCreators = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const groupPostsByCreator = await postDAL.aggregate([{$group:{ _id: "$createdBy",count:{$count:{}}}},{$sort:{count: -1}}]).limit(10);
            const topTenCreatorsIds = groupPostsByCreator.map(currCreator => currCreator._id);
            const topTenCreators = await userDAL.find({_id:{$in: topTenCreatorsIds}});
            res.status(200).json(topTenCreators);
            next();
        }catch(err){
            res.status(500).json("Failed to retrieve top ten creators");
        }
    }

    //returns the average run times of get and create post
    public static postAndGetRuntime = async (req:Request,
        res:Response, next: NextFunction): Promise<void> =>{
        try{
            const { createOperationAverageRunTime, getOperationAverageRunTime } = await statisticsDAL.findOne({});
            res.status(200).json({ createAverage:`${createOperationAverageRunTime} seconds`, getAverage: `${getOperationAverageRunTime} seconds`});
            next();
        }
        catch(err){
            res.status(500).json("Failed to get post and get operations average run time")
        }
    }

}

