"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../routes/index"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(cors({
    methods: ['GET', 'POST', 'DELETE'],
    origin: [
        'http://localhost:3000', 'http:/sisgesc.net/*',
        'https://1837-2607-fb91-1c6b-d68a-b4a7-ce-fe6-a058.ngrok-free.app/*'
    ],
    optionsSuccessStatus: 200,
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    credentials: true
}));
app.use('/', index_1.default);
exports.default = app;
