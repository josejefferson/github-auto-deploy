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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var google_auth_library_1 = require("google-auth-library");
var nodemailer_1 = __importDefault(require("nodemailer"));
var config_1 = require("./config");
function createTransporter() {
    return __awaiter(this, void 0, void 0, function () {
        var oauth2Client, accessToken, transporter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!config_1.config.gmail)
                        return [2 /*return*/, null];
                    oauth2Client = new google_auth_library_1.OAuth2Client(config_1.config.gmail.clientID, config_1.config.gmail.clientSecret, 'https://developers.google.com/oauthplayground');
                    oauth2Client.setCredentials({
                        refresh_token: config_1.config.gmail.refreshToken // eslint-disable-line camelcase
                    });
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            oauth2Client.getAccessToken(function (err, token) {
                                if (err)
                                    reject(err);
                                resolve(token);
                            });
                        })];
                case 1:
                    accessToken = _a.sent();
                    transporter = nodemailer_1.default.createTransport({
                        service: 'gmail',
                        auth: {
                            type: 'OAuth2',
                            user: config_1.config.gmail.email,
                            accessToken: accessToken,
                            clientId: config_1.config.gmail.clientID,
                            clientSecret: config_1.config.gmail.clientSecret,
                            refreshToken: config_1.config.gmail.refreshToken
                        }
                    });
                    return [2 /*return*/, transporter];
            }
        });
    });
}
var transporter = createTransporter();
function send(options) {
    return __awaiter(this, void 0, void 0, function () {
        var emailTransporter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, transporter];
                case 1:
                    emailTransporter = _a.sent();
                    if (!config_1.config.gmail || !emailTransporter)
                        return [2 /*return*/];
                    options = Object.assign(options, {
                        from: {
                            name: config_1.config.gmail.name,
                            address: config_1.config.gmail.email
                        }
                    });
                    return [2 /*return*/, emailTransporter.sendMail(options)];
            }
        });
    });
}
exports.default = send;
