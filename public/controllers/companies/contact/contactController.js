"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = void 0;
const mailConfig_1 = require("../../../mailConfig/mailConfig");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
exports.contactController = (() => {
    const { transporter } = (0, mailConfig_1.mailConfig)();
    const newMessage = ((data, emailToSend) => __awaiter(void 0, void 0, void 0, function* () {
        const htmlFilePath = path_1.default.resolve(__dirname, 'email-template.html');
        const html = fs.readFileSync(htmlFilePath, 'utf-8');
        const styledHtml = html
            .replace('{{name}}', data.name)
            .replace('{{email}}', data.email)
            .replace('{{message}}', data.message)
            .replace('{{tel}}', data.tel)
            .replace('{{surname}}', data.surname || '');
        const mailOptions = {
            from: data.email,
            to: emailToSend,
            subject: 'Um novo contacto',
            html: styledHtml,
            text: ''
        };
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        reject('Erro ao envia o email, por favor verifique se o email esta correto e tente novamente !!!');
                    }
                    else {
                        resolve('Mesagem enviada com sucesso sera contactado asim que posivel. \n OBRIGADO POR CANTACTAR');
                    }
                });
            });
        });
    }));
    return { newMessage };
});
