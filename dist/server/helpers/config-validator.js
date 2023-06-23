"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup_1 = require("yup");
var yup_locale_pt_1 = require("yup-locale-pt");
var helpers_1 = require("./helpers");
(0, yup_1.setLocale)(yup_locale_pt_1.pt);
var configSchema = (0, yup_1.object)({
    port: (0, yup_1.number)()
        .integer()
        .positive()
        .min(1)
        .max(65535)
        .default(Number(process.env.PORT || 3000)),
    urlPath: (0, yup_1.string)().default('/'),
    gmail: (0, yup_1.object)({
        name: (0, yup_1.string)().default('Sistema de deploy automático via GitHub'),
        email: (0, yup_1.string)().email().required(),
        clientID: (0, yup_1.string)().required(),
        clientSecret: (0, yup_1.string)().required(),
        refreshToken: (0, yup_1.string)().required(),
        receivers: (0, yup_1.array)((0, yup_1.string)().email().required()).default([])
    })
        .nullable()
        .default(null),
    apps: (0, yup_1.array)((0, yup_1.object)({
        id: (0, yup_1.string)().required(),
        displayName: (0, yup_1.string)().required(),
        gitBranch: (0, yup_1.string)().default('main'),
        githubWebhookSecret: (0, yup_1.string)().required(),
        folderAbsolutePath: (0, yup_1.string)().required(),
        gmailReceivers: (0, yup_1.array)((0, yup_1.string)().email().required()).nullable().default(null),
        systemdServiceName: (0, yup_1.string)().default(''),
        stopCommand: (0, yup_1.string)().nullable().default('sudo systemctl stop #'),
        startCommand: (0, yup_1.string)().nullable().default('sudo systemctl start #'),
        backupAbsolutePath: (0, yup_1.string)().nullable().default(''),
        resetCommand: (0, yup_1.string)().nullable().default('git reset --hard'),
        cleanCommand: (0, yup_1.string)().nullable().default('git clean -f -d'),
        pullCommand: (0, yup_1.string)().nullable().default('git pull'),
        installCommand: (0, yup_1.string)().nullable().default('yarn install --production=false'),
        buildCommand: (0, yup_1.string)().nullable().default('yarn build'),
        undoWhenFailed: (0, yup_1.boolean)().default(true)
    }).required()).required(),
    users: (0, yup_1.array)((0, yup_1.object)({
        name: (0, yup_1.string)().required(),
        username: (0, yup_1.string)().required(),
        password: (0, yup_1.string)().required()
    })).default([])
});
function validateConfig(config) {
    try {
        configSchema.validateSync(config);
        return configSchema.cast(config, { stripUnknown: true });
    }
    catch (err) {
        (0, helpers_1.log)('ERROR', 'Erro na validação da configuração "config.yml": ', err.message);
        process.exit(1);
    }
}
exports.default = validateConfig;
