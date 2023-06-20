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
exports.undoDeploy = exports.startDeploy = exports.deploy = void 0;
var config_1 = require("../config/config");
var backup_1 = require("../steps/backup");
var email_1 = require("../steps/email");
var update_code_1 = require("../steps/update-code");
var server_1 = require("../steps/server");
var install_and_build_1 = require("../steps/install-and-build");
var helpers_1 = require("./helpers");
var realtime_1 = require("../config/realtime");
function deploy(app) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            resetApp(app);
            startDeploy(app)
                .then(function () {
                var time = Math.round((Date.now() - app.deployStartTime) / 1000);
                app.deployTime = time;
                (0, realtime_1.sendUpdate)(app, 'deployTime');
                (0, helpers_1.log)('OK', "Deploy finalizado. Tempo: ".concat(time, " segundos"));
            })
                .catch(function (err) {
                (0, helpers_1.log)('ERROR', 'Ocorreu um erro no deploy:');
                console.error(err);
            })
                .finally(function () {
                app.deploying = false;
                (0, realtime_1.sendUpdate)(app, 'deploying');
                var nextDeploy = config_1.state.apps.find(function (app) { return app.pendingDeploy; });
                if (nextDeploy) {
                    (0, helpers_1.log)('INFO', "Deploy pendente da aplica\u00E7\u00E3o \"".concat(nextDeploy.displayName, "\" iniciado \u00E0s ").concat(new Date().toLocaleString()));
                    deploy(nextDeploy);
                }
            });
            return [2 /*return*/];
        });
    });
}
exports.deploy = deploy;
function resetApp(app) {
    app.deployError = '';
    app.logs.reset = '';
    app.logs.clean = '';
    app.logs.pull = '';
    app.logs.install = '';
    app.logs.build = '';
    app.deploying = true;
    app.deployStartTime = Date.now();
    app.deployTime = 0;
    app.pendingDeploy = false;
    (0, realtime_1.sendUpdate)(app, 'deployError', 'logs', 'deploying', 'deployStartTime', 'deployTime', 'pendingDeploy');
}
/** Faz um deploy */
function startDeploy(app) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    (0, email_1.sendStartDeployEmail)(app); // Envia um e-mail avisando que o deploy iniciou
                    return [4 /*yield*/, (0, server_1.stopServer)(app)]; // Para o servidor
                case 1:
                    _a.sent(); // Para o servidor
                    return [4 /*yield*/, (0, helpers_1.sleep)(3000)]; // Aguarda 3 segundos
                case 2:
                    _a.sent(); // Aguarda 3 segundos
                    return [4 /*yield*/, (0, backup_1.backupServer)(app)]; // Faz um backup do servidor
                case 3:
                    _a.sent(); // Faz um backup do servidor
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    (0, server_1.startServer)(app);
                    app.status = 'error';
                    app.deployError = (err_1 === null || err_1 === void 0 ? void 0 : err_1.message) + '\n' + (err_1 === null || err_1 === void 0 ? void 0 : err_1.stack);
                    (0, realtime_1.sendUpdate)(app, 'status', 'deployError');
                    (0, email_1.sendErrorDeployEmail)(app); // Envia um e-mail avisando que houve falha no deploy
                    return [2 /*return*/];
                case 5:
                    _a.trys.push([5, 11, , 13]);
                    return [4 /*yield*/, (0, update_code_1.resetAndClean)(app)]; // Apaga qualquer alteração no git
                case 6:
                    _a.sent(); // Apaga qualquer alteração no git
                    return [4 /*yield*/, (0, update_code_1.pull)(app)]; // Baixa as novas atualizações
                case 7:
                    _a.sent(); // Baixa as novas atualizações
                    return [4 /*yield*/, (0, install_and_build_1.install)(app)]; // Instala as dependências atualizadas
                case 8:
                    _a.sent(); // Instala as dependências atualizadas
                    return [4 /*yield*/, (0, install_and_build_1.build)(app)]; // Faz o build da aplicação
                case 9:
                    _a.sent(); // Faz o build da aplicação
                    return [4 /*yield*/, (0, server_1.startServer)(app)]; // Inicia o servidor
                case 10:
                    _a.sent(); // Inicia o servidor
                    (0, email_1.sendSuccessDeployEmail)(app); // Envia um e-mail avisando que houve sucesso no deploy
                    app.status = 'success';
                    (0, realtime_1.sendUpdate)(app, 'status');
                    return [3 /*break*/, 13];
                case 11:
                    err_2 = _a.sent();
                    (0, helpers_1.log)('ERROR', 'Ocorreu um erro ao fazer o deploy');
                    console.error(err_2);
                    app.status = 'error';
                    app.deployError = (err_2 === null || err_2 === void 0 ? void 0 : err_2.message) + '\n' + (err_2 === null || err_2 === void 0 ? void 0 : err_2.stack);
                    (0, realtime_1.sendUpdate)(app, 'status', 'deployError');
                    (0, email_1.sendErrorDeployEmail)(app); // Envia um e-mail avisando que houve falha no deploy
                    return [4 /*yield*/, undoDeploy(app)]; // Desfaz o deploy
                case 12:
                    _a.sent(); // Desfaz o deploy
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.startDeploy = startDeploy;
/** Desfaz um deploy */
function undoDeploy(app) {
    return __awaiter(this, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (app.backupAbsolutePath === null || !app.undoWhenFailed)
                        return [2 /*return*/];
                    (0, helpers_1.log)('INFO', 'Desfazendo deploy');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 8]);
                    (0, email_1.sendStartUndoDeployEmail)(app); // Envia um e-mail avisando que está desfazendo as alterações
                    return [4 /*yield*/, (0, server_1.stopServer)(app)]; // Para o servidor
                case 2:
                    _a.sent(); // Para o servidor
                    return [4 /*yield*/, (0, helpers_1.sleep)(3000)]; // Aguarda 3 segundos
                case 3:
                    _a.sent(); // Aguarda 3 segundos
                    return [4 /*yield*/, (0, backup_1.restoreLastBackup)(app)]; // Restaura o último backup
                case 4:
                    _a.sent(); // Restaura o último backup
                    return [4 /*yield*/, (0, server_1.startServer)(app)]; // Inicia o servidor
                case 5:
                    _a.sent(); // Inicia o servidor
                    (0, email_1.sendUndoDeployEmail)(app); // Envia um e-mail avisando que houve sucesso na restauração do servidor
                    app.status = 'restored';
                    (0, realtime_1.sendUpdate)(app, 'status');
                    return [3 /*break*/, 8];
                case 6:
                    err_3 = _a.sent();
                    (0, helpers_1.log)('ERROR', 'Ocorreu um erro ao desfazer deploy');
                    console.error(err_3);
                    app.deployError = (err_3 === null || err_3 === void 0 ? void 0 : err_3.message) + '\n' + (err_3 === null || err_3 === void 0 ? void 0 : err_3.stack);
                    (0, realtime_1.sendUpdate)(app, 'deployError');
                    (0, email_1.sendErrorUndoDeployEmail)(app); // Envia um e-mail avisando houve um erro ao desfazer as alterações
                    return [4 /*yield*/, (0, server_1.startServer)(app)]; // Inicia o servidor
                case 7:
                    _a.sent(); // Inicia o servidor
                    app.status = 'error';
                    (0, realtime_1.sendUpdate)(app, 'status');
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.undoDeploy = undoDeploy;
