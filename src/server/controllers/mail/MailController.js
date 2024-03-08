"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
var nodemailer = require("nodemailer");
var sendMail = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var mailOptions, transporter;
    return __generator(this, function (_a) {
        try {
            mailOptions = {
                from: "kemmel7007@mail.ru",
                to: "maximkemmel@yandex.ru",
                subject: request.body.params.description,
                html: "<b>".concat(request.body.params.description, "</b><br/><br/><b>\u0418\u043C\u044F</b>: ").concat(request.body.params.name, "<br/><b>\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430</b>: ").concat(request.body.params.phone, "<br/><b>\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435</b>: ").concat(request.body.params.message),
            };
            transporter = nodemailer.createTransport({
                host: "smtp.mail.ru",
                port: 465,
                secure: true,
                service: "Mail",
                auth: {
                    user: "kemmel7007@mail.ru",
                    pass: "vpHufVRShcJP0gbiW27C",
                },
            });
            transporter.sendMail(mailOptions, function (error, _info) {
                if (error) {
                    response.status(500).json({
                        success: false,
                        message: "Ошибка при отправке письма",
                        error: error,
                    });
                }
                else {
                    return response.status(200).json({
                        success: true,
                    });
                }
            });
        }
        catch (error) {
            response.status(500).json({
                success: false,
                message: "Ошибка при отправке письма",
                error: error,
            });
        }
        return [2 /*return*/];
    });
}); };
exports.sendMail = sendMail;
