"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// multerConfig.ts
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
// Multer configuration
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/"); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        // Generate a unique filename for uploaded files
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
// Function to filter file uploads (if needed)
var fileFilter = function (req, file, cb) {
    // Accept only specific file types
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true); // Accept the file
    }
    else {
        cb(new Error("Unsupported file type"), false); // Reject the file
    }
};
// Export multer instance with configured settings
var upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
});
exports.default = upload;
