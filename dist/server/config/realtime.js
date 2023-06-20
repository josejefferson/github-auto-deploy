"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendUpdate = exports.realtime = void 0;
var events_1 = __importDefault(require("events"));
var helpers_1 = require("../helpers/helpers");
exports.realtime = new events_1.default();
function sendUpdate(app) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var data = keys.map(function (key) {
        return [key, (0, helpers_1.getDeepValue)(app, key)];
    });
    exports.realtime.emit('update', { id: app.id, data: data });
}
exports.sendUpdate = sendUpdate;
