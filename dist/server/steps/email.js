"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.sendErrorUndoDeployEmail = exports.sendUndoDeployEmail = exports.sendStartUndoDeployEmail = exports.sendErrorDeployEmail = exports.sendSuccessDeployEmail = exports.sendStartDeployEmail = void 0;
var config_1 = require("../config/config");
var email_1 = __importDefault(require("../config/email"));
var helpers_1 = require("../helpers/helpers");
/**
 * Envia um e-mail avisando o início do deploy
 */
function sendStartDeployEmail(app) {
    var title = 'Deploy iniciado';
    var body = "O deploy da aplica\u00E7\u00E3o <b>".concat(app.displayName, "</b> foi iniciado \u00E0s ").concat(new Date().toLocaleString());
    sendEmail(app, title, body);
}
exports.sendStartDeployEmail = sendStartDeployEmail;
/**
 * Envia um e-mail avisando o sucesso do deploy
 */
function sendSuccessDeployEmail(app) {
    var time = Math.round((Date.now() - app.deployStartTime) / 1000);
    app.deployTime = time;
    var title = '✅ Deploy finalizado com sucesso';
    var body = "\n\t\tO deploy da aplica\u00E7\u00E3o <b>".concat(app.displayName, "</b> foi finalizado com sucesso!<br><br>\n    <h3>DETALHES</h3>\n    <ul>\n\t\t\t<li><b>Tempo:</b> ").concat(time, " segundos</li>\n    </ul>\n\t");
    body += (0, helpers_1.makeEmailLogs)(app);
    sendEmail(app, title, body);
}
exports.sendSuccessDeployEmail = sendSuccessDeployEmail;
/**
 * Envia um e-mail avisando o erro do deploy
 */
function sendErrorDeployEmail(app) {
    var title = '❌ Erro ao fazer deploy';
    var body = "\n\t\tOcorreu um erro durante o deploy da aplica\u00E7\u00E3o <b>".concat(app.displayName, "</b><br><br>\n    <h3>DETALHES DO ERRO</h3>\n    <pre>").concat(app.deployError, "</pre>\n\t");
    body += (0, helpers_1.makeEmailLogs)(app);
    sendEmail(app, title, body);
}
exports.sendErrorDeployEmail = sendErrorDeployEmail;
/**
 * Envia um e-mail avisando o início de desfazer o deploy
 */
function sendStartUndoDeployEmail(app) {
    var title = '↩ Desfazendo o deploy';
    var body = "Desfazendo o \u00FAltimo deploy da aplica\u00E7\u00E3o <b>".concat(app.displayName, "</b>");
    sendEmail(app, title, body);
}
exports.sendStartUndoDeployEmail = sendStartUndoDeployEmail;
/**
 * Envia um e-mail avisando o sucesso de desfazer o deploy
 */
function sendUndoDeployEmail(app) {
    var time = Math.round((Date.now() - app.deployStartTime) / 1000);
    var title = 'ℹ Deploy desfeito';
    var body = "\n\t\tO deploy da aplica\u00E7\u00E3o <b>".concat(app.displayName, "</b> foi desfeito com sucesso<br><br>\n    <h3>DETALHES</h3>\n    <ul>\n\t\t\t<li><b>Tempo:</b> ").concat(time, " segundos</li>\n    </ul>\n\t");
    body += (0, helpers_1.makeEmailLogs)(app);
    sendEmail(app, title, body);
}
exports.sendUndoDeployEmail = sendUndoDeployEmail;
/**
 * Envia um e-mail avisando o erro de desfazer o deploy
 */
function sendErrorUndoDeployEmail(app) {
    var title = '❌ Erro ao desfazer deploy';
    var body = "\n\t\tOcorreu um erro durante o processo de desfazer deploy da aplica\u00E7\u00E3o <b>".concat(app.displayName, "</b><br><br>\n    <h3>DETALHES DO ERRO</h3>\n    <pre>").concat(app.deployError, "</pre>\n\t");
    body += (0, helpers_1.makeEmailLogs)(app);
    sendEmail(app, title, body);
}
exports.sendErrorUndoDeployEmail = sendErrorUndoDeployEmail;
var footer = "\n<div style=\"padding-top: 10px; border-bottom: 1px solid #acacac;\"></div>\n\n<div style=\"padding-top: 10px; color: #acacac\">\n  Este email foi enviado automaticamente pelo sistema de deploy autom\u00E1tico via GitHub.<br>\n  N\u00E3o responder a este e-mail.<br>\n  Este N\u00C3O \u00E9 um e-mail oficial do GitHub Inc.<br>\n  <a href=\"https://github.com/josejefferson/github-auto-deploy\" style=\"color: #acacac;\">Link do projeto no GitHub</a>\n</div>\n";
/**
 * Envia um e-mail
 */
function sendEmail(app, title, body) {
    var _a;
    var to = app.gmailReceivers || ((_a = config_1.config.gmail) === null || _a === void 0 ? void 0 : _a.receivers) || [];
    if (!to.length)
        return;
    var fullTitle = "[#".concat((0, helpers_1.random)(1000, 9999), "] ").concat(app.displayName, ": ").concat(title);
    (0, email_1.default)({ to: to, subject: fullTitle, html: body + footer })
        .then(function () {
        if (process.env.NODE_ENV === 'development')
            (0, helpers_1.log)('INFO', "E-mail \"".concat(fullTitle, "\" enviado"));
    })
        .catch(function (err) {
        (0, helpers_1.log)('INFO', "Falha ao enviar e-mail \"".concat(title, "\":"));
        console.error(err);
    });
}
exports.sendEmail = sendEmail;
