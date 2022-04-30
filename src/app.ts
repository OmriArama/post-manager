import express from 'express';
import { Config } from './config';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRouter from './routes/postRoute';
import statisticsRouter from './routes/statisticsRoute';

/*
    The express application class
*/
export class App  {
    public app: express.Application

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use('/posts', postRouter);
        this.app.use("/statistics", statisticsRouter)
        this.setMongoDBConnection()
        
    }

    //connects the application to the db
    private setMongoDBConnection = async () => {
        try {
           await mongoose.connect(Config.mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
           this.app.emit("start")
           console.log('success connecting to db');
        }
        catch(err){
            console.log('failed to connect to db');
        }
    }
}

export default App
