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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_sse_middleware_1 = require("express-sse-middleware");
var EventBuilder_1 = __importDefault(require("express-sse-middleware/dist/EventBuilder"));
var helpers_1 = require("../helpers/helpers");
var verify_secret_1 = __importDefault(require("../helpers/verify-secret"));
var inject_app_1 = __importDefault(require("../middleware/inject-app"));
var start_deploy_1 = __importDefault(require("../middleware/start-deploy"));
var config_1 = require("./config");
var realtime_1 = require("./realtime");
var express_basic_auth_1 = __importDefault(require("express-basic-auth"));
var app = (0, express_1.default)();
var router = express_1.default.Router();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({
    verify: function (req, res, buf, encoding) {
        if (buf && buf.length)
            req.rawBody = buf.toString(encoding || 'utf8');
    }
}));
app.use(express_sse_middleware_1.sseMiddleware);
app.use(config_1.config.urlPath, router);
var users = {};
config_1.config.users.forEach(function (user) {
    users[user.username] = user.password;
});
var auth = process.env.NODE_ENV !== 'development'
    ? (0, express_basic_auth_1.default)({
        authorizer: (0, helpers_1.authorizer)(users),
        challenge: true
    })
    : [];
router.get('/state', auth, function (req, res) {
    res.json(config_1.state);
});
router.use('/realtime', auth, function (req, res) {
    var sse = res.sse();
    var sendUpdate = function (data) { return sse.send(new EventBuilder_1.default().event('update').data(data).build()); };
    realtime_1.realtime.on('update', sendUpdate);
    res.on('close', function () {
        realtime_1.realtime.off('update', sendUpdate);
    });
});
router.post('/deploy/:app', inject_app_1.default, verify_secret_1.default, start_deploy_1.default);
if (process.env.NODE_ENV === 'development') {
    router.get('/deploy/:app', inject_app_1.default, verify_secret_1.default, start_deploy_1.default);
}
// Next.JS
var handler = process.env.NODE_ENV === 'development'
    ? Promise.resolve().then(function () { return __importStar(require('./next-handler')); }) : Promise.resolve({ default: express_1.default.static('out') });
app.get('*', auth, function (req, res, next) {
    handler.then(function (_a) {
        var handler = _a.default;
        return handler(req, res, next);
    });
});
app.listen(config_1.config.port, function () {
    (0, helpers_1.log)('INFO', 'Servidor webhook iniciado na porta ' + config_1.config.port);
    (0, helpers_1.log)('INFO', 'Aguardando deployments...');
});
