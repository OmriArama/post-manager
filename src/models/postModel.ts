import { Document, model, Schema, Types } from 'mongoose';
import { PostInterface } from '../interfaces/postInterface';

//Post mongo schema
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdBy:{
        type: Types.ObjectId,
        required: true,
        ref: "users"
    }
}, { versionKey: false,timestamps:true });

export interface IPostModal extends PostInterface, Document { }

//Post data access layer
export const postDAL = model<IPostModal>(
    'posts',
    postSchema
);
