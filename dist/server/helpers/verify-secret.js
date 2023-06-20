"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var crypto_1 = __importDefault(require("crypto"));
function verifySecret(req, res, next) {
    (0, helpers_1.log)('EVENT', "Requisi\u00E7\u00E3o recebida da aplica\u00E7\u00E3o \"".concat(req.deployApp.displayName, "\", verificando assinatura..."));
    var SECRET = req.deployApp.githubWebhookSecret;
    try {
        var sig = Buffer.from(req.get('X-Hub-Signature-256') || '', 'utf8');
        var hmac = crypto_1.default.createHmac('sha256', SECRET);
        var digest = Buffer.from('sha256=' + hmac.update(req.rawBody).digest('hex'), 'utf8');
        if (sig.length !== digest.length || !crypto_1.default.timingSafeEqual(digest, sig)) {
            throw new Error('Invalid signature');
        }
    }
    catch (err) {
        (0, helpers_1.log)('ERROR', 'Assinatura inválida');
        if (process.env.NODE_ENV === 'development')
            return next();
        return res.status(401).send('401 Unauthorized');
    }
    (0, helpers_1.log)('OK', 'Assinatura válida');
    return next();
}
exports.default = verifySecret;
