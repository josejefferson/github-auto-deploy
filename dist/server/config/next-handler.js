"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var next_1 = __importDefault(require("next"));
var nextApp = (0, next_1.default)({ dev: true });
nextApp.prepare().catch(console.error);
var nextHandle = nextApp.getRequestHandler();
exports.default = nextHandle;
