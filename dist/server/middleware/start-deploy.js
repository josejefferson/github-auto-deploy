"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config/config");
var helpers_1 = require("../helpers/helpers");
var deploy_1 = require("../helpers/deploy");
var realtime_1 = require("../config/realtime");
function startDeploy(req, res) {
    var _a, _b, _c;
    if (process.env.NODE_ENV !== 'development' &&
        ((_a = req.body) === null || _a === void 0 ? void 0 : _a.ref) !== "refs/heads/".concat(req.deployApp.gitBranch)) {
        (0, helpers_1.log)('WARNING', "O commit n\u00E3o pertence \u00E0 branch ".concat(req.deployApp.gitBranch, ", o deploy n\u00E3o ser\u00E1 realizado"));
        return res.sendStatus(200);
    }
    req.deployApp.pendingDeploy = true;
    (0, realtime_1.sendUpdate)(req.deployApp, 'pendingDeploy');
    var busy = config_1.state.apps.some(function (app) { return app.deploying; });
    if (!busy) {
        (0, helpers_1.log)('INFO', "Deploy da aplica\u00E7\u00E3o \"".concat(req.deployApp.displayName, "\" iniciado \u00E0s ").concat(new Date().toLocaleString(), " por \"").concat((_c = (_b = req.body) === null || _b === void 0 ? void 0 : _b.pusher) === null || _c === void 0 ? void 0 : _c.name, "\""));
        (0, deploy_1.deploy)(req.deployApp);
    }
    else {
        (0, helpers_1.log)('WARNING', "J\u00E1 h\u00E1 um deploy em andamento, o deploy da aplica\u00E7\u00E3o \"".concat(req.deployApp.displayName, "\" ser\u00E1 iniciado ap\u00F3s a finaliza\u00E7\u00E3o do(s) anterior(es)"));
    }
    res.sendStatus(200);
}
exports.default = startDeploy;
