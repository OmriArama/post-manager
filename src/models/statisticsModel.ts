import { Document, model, Schema } from 'mongoose';
import { StatisticsInterface } from '../interfaces/statisticsInterface';

//Statistics schema
const statisticsSchema = new Schema({
    createOperationsCount: {
        type: Number,
        required: true
    },
    createOperationAverageRunTime: {
        type: Number,
        required: true
    },
    getOperationCount: {
        type: Number,
        required: true
    },
    getOperationAverageRunTime: {
        type: Number,
        required: true
    }
}, { versionKey: false, timestamps:true });

export interface IStatisticsModal extends StatisticsInterface, Document { }

//Statistics data access layer
export const statisticsDAL = model<IStatisticsModal>(
    'statistics',
    statisticsSchema
);
