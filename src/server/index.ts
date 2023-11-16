import express from 'express';
import mainRouter from '../routes/index';
import bodyParser from 'body-parser';
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(express.json({limit :'50mb'}))
app.use(express.urlencoded({extended: true,limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    methods: ['GET','POST','DELETE'],
    origin: [
        'http://localhost:3000','http:/sisgesc.net/*',
        'https://1837-2607-fb91-1c6b-d68a-b4a7-ce-fe6-a058.ngrok-free.app/*'
    ],
    optionsSuccessStatus: 200,
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    credentials: true
}));
app.use('/', mainRouter);
export default app;