import responseTime from "response-time"
import { statisticsDAL } from "../models/statisticsModel";
import { Config } from '../config';


//  Statistics middleware help us monitor the runtime of certain requests
export const statisticsMiddleware = (requestName: string) => 
    responseTime(async (req,res,time)=>{
    const statistics = await statisticsDAL.findOne();
    let updateQuery = {}
    if(requestName ===  Config.createRequestName) {
        const newOpsNumber = statistics.createOperationsCount + 1;
        const newAvg = ((statistics.createOperationAverageRunTime*statistics.createOperationsCount)+time)/(statistics.createOperationsCount + 1)
        updateQuery = {
            createOperationsCount: newOpsNumber,
            createOperationAverageRunTime: newAvg
        }
    }
    else if(requestName === Config.getRequestName) {
        const newOpsNumber = statistics.getOperationCount + 1;
        const newAvg = ((statistics.getOperationAverageRunTime*statistics.getOperationCount)+time)/(statistics.getOperationCount + 1)
        updateQuery = {
            getOperationCount: newOpsNumber,
            getOperationAverageRunTime: newAvg
        }
    }
    await statisticsDAL.findOneAndUpdate({},{
        $set: updateQuery
    })
})
