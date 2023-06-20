"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var helpers_1 = require("../helpers/helpers");
function verifySecret(req, res, next) {
    (0, helpers_1.log)('EVENT', 'Requisição recebida, verificando assinatura...');
    var sig = Buffer.from(req.get('X-Hub-Signature-256') || '', 'utf8');
    var hmac = crypto_1.default.createHmac('sha256', req.deployApp.githubWebhookSecret);
    var digest = Buffer.from('sha256=' + hmac.update(req.rawBody).digest('hex'), 'utf8');
    if (sig.length !== digest.length || !crypto_1.default.timingSafeEqual(digest, sig)) {
        (0, helpers_1.log)('ERROR', 'Assinatura inválida');
        return res.status(401).send('401 Unauthorized');
    }
    (0, helpers_1.log)('OK', 'Assinatura válida');
    return next();
}
exports.default = verifySecret;
