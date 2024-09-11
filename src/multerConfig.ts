import multer from 'multer';

// Define storage configuration (update as needed)
const storage = multer.memoryStorage();

// Helper function to create a dynamic file filter for multiple MIME types
const dynamicFileFilter = (allowedMimeTypes: string[]) => {
  return (req: any, file: any, cb: any) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type. Only specific document and image files are allowed.'), false); // Reject the file
    }
  };
};

// Allowed MIME types for documents and images
const allowedFileTypes = [
  "application/pdf",        // PDF
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",  // DOCX
  "application/msword",      // DOC
  "image/jpeg",              // JPEG images
  "image/png"                // PNG images
];

// Multer upload configuration for both documents and images
const uploadDocumentsAndImages = multer({
  storage: storage,
  fileFilter: dynamicFileFilter(allowedFileTypes), // Allow specific document and image types
});

export default uploadDocumentsAndImages;
