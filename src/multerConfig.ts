// multerConfig.ts
import multer, { StorageEngine } from "multer";
import path from "path";
import { Request } from "express";

// Multer configuration
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void): void => {
    cb(null, "./uploads/"); // Destination folder for uploaded files
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void): void => {
    // Generate a unique filename for uploaded files
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Function to filter file uploads (if needed)
const fileFilter = (req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void): void => {
  // Accept only specific file types
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Unsupported file type"), false); // Reject the file
  }
};

// Export multer instance with configured settings
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
