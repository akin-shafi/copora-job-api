"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRONTEND_LOGIN = exports.FRONTEND_URL = exports.BASE_URL = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, NODE_ENV = _a.NODE_ENV, LOCAL_URL = _a.LOCAL_URL, REMOTE_URL = _a.REMOTE_URL, FRONTEND_URL_LOCAL = _a.FRONTEND_URL_LOCAL, FRONTEND_LOGIN_URL = _a.FRONTEND_LOGIN_URL, REMOTE_LOGIN_URL = _a.REMOTE_LOGIN_URL, FRONTEND_URL_REMOTE = _a.FRONTEND_URL_REMOTE;
var BASE_URL = NODE_ENV === 'development' ? LOCAL_URL : REMOTE_URL;
exports.BASE_URL = BASE_URL;
var FRONTEND_URL = NODE_ENV === 'development' ? FRONTEND_URL_LOCAL : FRONTEND_URL_REMOTE;
exports.FRONTEND_URL = FRONTEND_URL;
var FRONTEND_LOGIN = NODE_ENV === 'development' ? FRONTEND_LOGIN_URL : REMOTE_LOGIN_URL;
exports.FRONTEND_LOGIN = FRONTEND_LOGIN;
