"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config/config");
var helpers_1 = require("../helpers/helpers");
function injectApp(req, res, next) {
    if (!req.params.app) {
        return res.sendStatus(404);
    }
    var app = config_1.state.apps.find(function (app) { return app.id === req.params.app; });
    if (!app) {
        (0, helpers_1.log)('ERROR', "App \"".concat(req.params.app, "\" n\u00E3o encontrado"));
        return res.sendStatus(400);
    }
    req.deployApp = app;
    next();
}
exports.default = injectApp;
