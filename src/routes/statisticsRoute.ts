import { Router } from 'express';
import StatisticsController from '../controllers/statisticsController';

//statistics router, handles statistics operations
const statisticsRouter = Router();

statisticsRouter.get("/topcreators",StatisticsController.getTopTenCreators)

statisticsRouter.get("/runtimes",StatisticsController.postAndGetRuntime)

export default statisticsRouter