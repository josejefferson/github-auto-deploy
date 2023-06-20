"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizer = exports.getDeepValue = exports.makeEmailLogs = exports.log = exports.random = exports.run = exports.sleep = void 0;
var bcrypt_1 = require("bcrypt");
var chalk_1 = __importDefault(require("chalk"));
var child_process_1 = require("child_process");
function sleep(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
exports.sleep = sleep;
function run(app, command) {
    if (process.env.NODE_ENV === 'development')
        console.log('$', command);
    return new Promise(function (resolve) {
        (0, child_process_1.exec)(command, { cwd: app.folderAbsolutePath }, function (error, stdout, stderr) {
            resolve({ error: error, stdout: stdout, stderr: stderr });
        });
    });
}
exports.run = run;
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.random = random;
function log(level) {
    var contents = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        contents[_i - 1] = arguments[_i];
    }
    var date = new Date();
    var day = date.getDate().toString().padStart(2, '0');
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var seconds = date.getSeconds().toString().padStart(2, '0');
    var fmtDate = "".concat(day, "/").concat(month, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
    var str = '';
    str += chalk_1.default.gray(fmtDate) + ' [';
    switch (level.toLowerCase()) {
        case 'error':
            str += chalk_1.default.redBright(level);
            break;
        case 'failed':
            str += chalk_1.default.redBright(level);
            break;
        case 'success':
            str += chalk_1.default.greenBright(level);
            break;
        case 'ok':
            str += chalk_1.default.greenBright(level);
            break;
        case 'event':
            str += chalk_1.default.magentaBright(level);
            break;
        case 'info':
            str += chalk_1.default.cyanBright(level);
            break;
        case 'warning':
            str += chalk_1.default.yellowBright(level);
            break;
        default:
            str += level;
    }
    str += ']';
    console.log.apply(console, __spreadArray([str], contents, false));
}
exports.log = log;
function makeEmailLogs(app) {
    var text = '';
    if (app.logs.reset || app.logs.clean || app.logs.pull || app.logs.install || app.logs.build) {
        text += '<h3>LOGS</h3>';
    }
    if (app.logs.reset)
        text += "<h4>RESET (".concat(app.resetCommand, ")</h4><pre>").concat(app.logs.reset, "</pre>");
    if (app.logs.clean)
        text += "<h4>CLEAN (".concat(app.cleanCommand, ")</h4><pre>").concat(app.logs.clean, "</pre>");
    if (app.logs.pull)
        text += "<h4>PULL (".concat(app.pullCommand, ")</h4><pre>").concat(app.logs.pull, "</pre>");
    if (app.logs.install)
        text += "<h4>INSTALL (".concat(app.installCommand, ")</h4><pre>").concat(app.logs.install, "</pre>");
    if (app.logs.build)
        text += "<h4>BUILD (".concat(app.buildCommand, ")</h4><pre>").concat(app.logs.build, "</pre>");
    return text;
}
exports.makeEmailLogs = makeEmailLogs;
function getDeepValue(obj, path) {
    var result = obj;
    var paths = path.split('.');
    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
        var p = paths_1[_i];
        if (result === null || result === undefined)
            return;
        result = result[p];
    }
    return result;
}
exports.getDeepValue = getDeepValue;
function authorizer(users) {
    return function (user, password) {
        if (users[user] === undefined) {
            return false;
        }
        var correct = (0, bcrypt_1.compareSync)(password, users[user]);
        return correct;
    };
}
exports.authorizer = authorizer;
