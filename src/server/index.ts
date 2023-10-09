import express from 'express';
import mainRouter from '../routes/index';
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(express.json({limit :'50mb'}))
app.use(express.urlencoded({extended: true,limit: '50mb'}))
app.use(cors())
app.use(cors({
    origin: ['http://localhost:5173','http:/7sisgesc.net/*'],
    optionsSuccessStatus: 200
}));
app.use('/', mainRouter);
export default app;