"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = exports.config = void 0;
var fs_1 = require("fs");
var helpers_1 = require("../helpers/helpers");
var yaml_1 = __importDefault(require("yaml"));
var config_validator_1 = __importDefault(require("../helpers/config-validator"));
var configStr = '';
try {
    configStr = (0, fs_1.readFileSync)('config.yml', { encoding: 'utf-8' });
}
catch (err) {
    (0, helpers_1.log)('ERROR', 'Erro ao ler o arquivo de configuração "config.yml". Verifique se ele existe, caso não exista crie-o');
    process.exit(1);
}
var rawConfig = yaml_1.default.parse(configStr);
exports.config = (0, config_validator_1.default)(rawConfig);
exports.state = __assign(__assign({}, exports.config), { deploying: false, apps: exports.config.apps.map(function (app) { return (__assign(__assign({}, app), { deploying: false, status: 'none', pendingDeploy: false, deployStartTime: 0, deployTime: 0, deployError: '', logs: {
            reset: '',
            clean: '',
            pull: '',
            install: '',
            build: ''
        } })); }) });
(0, helpers_1.log)('INFO', 'Configuração carregada do arquivo "config.yml"');
if (!exports.config.gmail) {
    (0, helpers_1.log)('WARNING', 'E-mail desativado');
}
if ((_a = exports.config.gmail) === null || _a === void 0 ? void 0 : _a.receivers.length) {
    (0, helpers_1.log)('INFO', 'Por padrão, os e-mails de deploy serão enviados para: ' + ((_b = exports.config.gmail) === null || _b === void 0 ? void 0 : _b.receivers.join(', ')));
}
(0, helpers_1.log)('INFO', exports.config.apps.length + ' app(s) configurado(s) para deploy');
