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
exports.restoreLastBackup = exports.backupFailedServer = exports.backupServer = void 0;
var fs_1 = __importDefault(require("fs"));
var fs_extra_1 = require("fs-extra");
var path_1 = __importDefault(require("path"));
var rimraf_1 = __importDefault(require("rimraf"));
var helpers_1 = require("../helpers/helpers");
var realtime_1 = require("../config/realtime");
var MAX_BACKUPS = 10;
/**
 * Faz um backup do servidor
 * @param broken Servidor está com problemas?
 */
function backupServer(app, broken) {
    if (broken === void 0) { broken = false; }
    return __awaiter(this, void 0, void 0, function () {
        var backupFolderName, backupFolder, backupFileName, backupFile, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (app.backupAbsolutePath === null)
                        return [2 /*return*/];
                    app.status = broken ? 'backupBroken' : 'backup';
                    (0, realtime_1.sendUpdate)(app, 'status');
                    (0, helpers_1.log)('INFO', "Fazendo backup do servidor".concat(broken ? ' com problemas' : ''));
                    backupFolderName = path_1.default.basename(app.folderAbsolutePath) + '-backups';
                    backupFolder = app.backupAbsolutePath || path_1.default.join(app.folderAbsolutePath, '..', backupFolderName);
                    backupFileName = "backup".concat(broken ? '-broken' : '', "-").concat(new Date().toISOString(), ".tar.gz");
                    backupFile = path_1.default.join(backupFolder, backupFileName);
                    return [4 /*yield*/, (0, fs_extra_1.mkdirp)(backupFolder)
                        // Faz o backup
                    ]; // Cria a pasta dos backups se não existe
                case 1:
                    _a.sent(); // Cria a pasta dos backups se não existe
                    return [4 /*yield*/, (0, helpers_1.run)(app, "tar -czf \"".concat(backupFile, "\" ."))];
                case 2:
                    error = (_a.sent()).error;
                    if (error)
                        throw error;
                    (0, helpers_1.log)('SUCCESS', 'Backup concluído');
                    // Remove backups antigos
                    removeOldBackups(app);
                    return [2 /*return*/];
            }
        });
    });
}
exports.backupServer = backupServer;
/**
 * Faz um backup do servidor com problemas
 */
function backupFailedServer(app) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (app.backupAbsolutePath === null)
                return [2 /*return*/];
            return [2 /*return*/, backupServer(app, true)];
        });
    });
}
exports.backupFailedServer = backupFailedServer;
/**
 * Restaura um backup
 */
function restoreLastBackup(app) {
    return __awaiter(this, void 0, void 0, function () {
        var backups, backupFolderName, backupFolder, backupFileName, backupFile, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (app.backupAbsolutePath === null)
                        return [2 /*return*/];
                    if (!app.undoWhenFailed)
                        return [2 /*return*/];
                    app.status = 'undo';
                    (0, realtime_1.sendUpdate)(app, 'status');
                    return [4 /*yield*/, backupFailedServer(app)];
                case 1:
                    _a.sent();
                    (0, helpers_1.log)('INFO', 'Restaurando último backup funcionando');
                    return [4 /*yield*/, listBackups(app)];
                case 2:
                    backups = _a.sent();
                    if (!backups.length)
                        throw new Error('Não há backups para restaurar');
                    (0, helpers_1.log)('INFO', 'Apagando servidor');
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            (0, rimraf_1.default)(app.folderAbsolutePath, function (err) {
                                if (err)
                                    return reject(err);
                                resolve();
                            });
                        })];
                case 3:
                    _a.sent();
                    (0, helpers_1.log)('INFO', 'Extraindo backup');
                    backupFolderName = path_1.default.basename(app.folderAbsolutePath) + '-backups';
                    backupFolder = app.backupAbsolutePath || path_1.default.join(app.folderAbsolutePath, '..', backupFolderName);
                    backupFileName = backups[backups.length - 1];
                    backupFile = path_1.default.join(backupFolder, backupFileName);
                    return [4 /*yield*/, (0, fs_extra_1.mkdirp)(app.folderAbsolutePath)]; // Cria a pasta do servidor, caso não exista
                case 4:
                    _a.sent(); // Cria a pasta do servidor, caso não exista
                    (0, helpers_1.log)('INFO', "Restaurando backup \"".concat(backupFileName, "\""));
                    return [4 /*yield*/, (0, helpers_1.run)(app, "tar -xf \"".concat(backupFile, "\" -C \"").concat(app.folderAbsolutePath, "\""))];
                case 5:
                    error = (_a.sent()).error;
                    if (error)
                        throw error;
                    (0, helpers_1.log)('SUCCESS', 'Backup restaurado com sucesso');
                    return [2 /*return*/];
            }
        });
    });
}
exports.restoreLastBackup = restoreLastBackup;
/**
 * Lista os arquivos de backup
 */
function listBackups(app) {
    return __awaiter(this, void 0, void 0, function () {
        var backupFolderName, backupFolder, files, backups;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    backupFolderName = path_1.default.basename(app.folderAbsolutePath) + '-backups';
                    backupFolder = app.backupAbsolutePath || path_1.default.join(app.folderAbsolutePath, '..', backupFolderName);
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            fs_1.default.readdir(backupFolder, function (err, files) {
                                if (err)
                                    return reject(err);
                                resolve(files);
                            });
                        })];
                case 1:
                    files = _a.sent();
                    backups = files
                        .filter(function (file) {
                        return (file.startsWith('backup-') && !file.startsWith('backup-broken-') && file.endsWith('.tar.gz'));
                    })
                        .sort();
                    return [2 /*return*/, backups];
            }
        });
    });
}
/**
 * Remove backups antigos
 */
function removeOldBackups(app) {
    return __awaiter(this, void 0, void 0, function () {
        var backupFolderName, backupFolder, backups, overflow, backupFileNamesToDelete, pathsToDelete, _i, pathsToDelete_1, pathName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isFinite(MAX_BACKUPS))
                        return [2 /*return*/];
                    backupFolderName = path_1.default.basename(app.folderAbsolutePath) + '-backups';
                    backupFolder = app.backupAbsolutePath || path_1.default.join(app.folderAbsolutePath, '..', backupFolderName);
                    return [4 /*yield*/, listBackups(app)];
                case 1:
                    backups = _a.sent();
                    if (backups.length > MAX_BACKUPS) {
                        overflow = backups.length - MAX_BACKUPS // Backups em excesso
                        ;
                        backupFileNamesToDelete = backups.slice(0, overflow) // Nomes dos arquivos para apagar
                        ;
                        pathsToDelete = backupFileNamesToDelete.map(function (fileName) {
                            return path_1.default.join(backupFolder, fileName);
                        });
                        // Apaga os backups antigos
                        for (_i = 0, pathsToDelete_1 = pathsToDelete; _i < pathsToDelete_1.length; _i++) {
                            pathName = pathsToDelete_1[_i];
                            fs_1.default.rm(pathName, function (err) {
                                if (err)
                                    console.error(err);
                            });
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
