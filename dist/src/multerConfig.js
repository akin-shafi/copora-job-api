"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
// Define storage configuration (update as needed)
var storage = multer_1.default.memoryStorage();
// Helper function to create a dynamic file filter for multiple MIME types
var dynamicFileFilter = function (allowedMimeTypes) {
    return function (req, file, cb) {
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true); // Accept the file
        }
        else {
            cb(new Error('Invalid file type. Only specific document and image files are allowed.'), false); // Reject the file
        }
    };
};
// Allowed MIME types for documents and images
var allowedFileTypes = [
    "application/pdf", // PDF
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    "application/msword", // DOC
    "image/jpeg", // JPEG images
    "image/png" // PNG images
];
// Multer upload configuration for both documents and images
var uploadDocumentsAndImages = (0, multer_1.default)({
    storage: storage,
    fileFilter: dynamicFileFilter(allowedFileTypes), // Allow specific document and image types
});
exports.default = uploadDocumentsAndImages;
