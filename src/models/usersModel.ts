import { Document, model, Schema } from 'mongoose';
import { UserInterface } from '../interfaces/userInterface';

//User schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
}, { versionKey: false,timestamps:true });

export interface IUserModal extends UserInterface, Document { }

//User data access layer
export const userDAL = model<IUserModal>(
    'users',
    userSchema
);
