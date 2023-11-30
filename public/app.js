"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./server/index"));
const port = 3001;
index_1.default.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
