"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/utils/logger.ts
var winston_1 = require("winston");
var logger = (0, winston_1.createLogger)({
    level: "info",
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.printf(function (_a) {
        var timestamp = _a.timestamp, level = _a.level, message = _a.message;
        return "".concat(timestamp, " [").concat(level, "]: ").concat(message);
    })),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: "error.log", level: "error" }),
        new winston_1.transports.File({ filename: "combined.log" }),
    ],
});
exports.default = logger;
