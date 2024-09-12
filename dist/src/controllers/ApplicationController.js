"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
var ApplicationService_1 = require("../services/ApplicationService");
var pdf_parse_1 = __importDefault(require("pdf-parse"));
var ApplicationController = /** @class */ (function () {
    function ApplicationController() {
    }
    // constructor() {
    //   this.autoFillApplicationFormWithUploadedResume = this.autoFillApplicationFormWithUploadedResume.bind(this);
    // }
    ApplicationController.createApplication = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ApplicationService_1.ApplicationService.createApplication(req.body)];
                    case 1:
                        result = _a.sent();
                        res.status(201).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(400).json({ error: error_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationController.getApplicationByNo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ApplicationService_1.ApplicationService.getApplicationByNo(req.params.applicationNo)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(400).json({ error: error_2.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationController.updateApplicationByNo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ApplicationService_1.ApplicationService.updateApplicationByNo(req.params.applicationNo, req.body)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(400).json({ error: error_3.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationController.deleteApplicationByNo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ApplicationService_1.ApplicationService.deleteApplicationByNo(req.params.applicationNo)];
                    case 1:
                        _a.sent();
                        res.status(204).send();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        res.status(400).json({ error: error_4.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationController.getApplicantData = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ApplicationService_1.ApplicationService.getApplicantData(req.params.applicationNo)];
                    case 1:
                        result = _a.sent();
                        if (!result.user) {
                            return [2 /*return*/, res.status(404).json({ message: 'Applicant not found' })];
                        }
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        res.status(500).json({ error: error_5.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationController.getAllApplicants = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ApplicationService_1.ApplicationService.getAllApplicants()];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        res.status(500).json({ error: error_6.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Method to handle auto-filling the application form using an uploaded resume
    ApplicationController.autoFillApplicationFormWithUploadedResume = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var resumeBuffer, resumeText, extractedData, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!req.file) {
                            return [2 /*return*/, res.status(400).json({ message: 'Resume file is required' })];
                        }
                        console.log("Received request to auto-fill form with resume.");
                        console.log("Resume file received:", req.file.originalname);
                        resumeBuffer = req.file.buffer;
                        console.log("Extracting text from resume buffer...");
                        // Validate buffer
                        if (!Buffer.isBuffer(resumeBuffer)) {
                            throw new Error("Uploaded file is not a valid buffer");
                        }
                        return [4 /*yield*/, (0, pdf_parse_1.default)(resumeBuffer)];
                    case 1:
                        resumeText = _a.sent();
                        console.log("Text extracted from resume:", resumeText.text);
                        return [4 /*yield*/, ApplicationController.extractDataFromResume(resumeText.text)];
                    case 2:
                        extractedData = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                message: 'Resume processed successfully',
                                extractedData: extractedData,
                            })];
                    case 3:
                        error_7 = _a.sent();
                        console.error('Error processing resume:', error_7);
                        return [2 /*return*/, res.status(500).json({ message: 'Error processing resume', error: error_7.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Static function to extract specific fields from resume text
    // static async extractDataFromResume(resumeText: string) {
    //   console.log('Extracting data from resume text...');
    //   const extractedData: any = {};
    //   // Split the text into lines to analyze the content more accurately
    //   const lines = resumeText.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    //   // Extract Name (look for typical name-like patterns, ignoring sections like "Work Experience")
    //   const nameRegex = /^[A-Z][a-z]+\s+[A-Z][a-z]+(\s+[A-Z][a-z]+)?$/;
    //   const nameLine = lines.find(line => nameRegex.test(line));
    //   if (nameLine) {
    //     extractedData.name = nameLine;
    //     console.log('Extracted name:', extractedData.name);
    //   } else {
    //     console.log('Name not found in resume text.');
    //   }
    //   // Extract Email
    //   const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
    //   const emailMatch = resumeText.match(emailRegex);
    //   if (emailMatch) {
    //     extractedData.email = emailMatch[0];
    //     console.log('Extracted email:', extractedData.email);
    //   } else {
    //     console.log('Email not found in resume text.');
    //   }
    //   // Extract Phone Number (handling international, local, or different delimiters)
    //   const phoneRegex = /\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
    //   const phoneMatch = resumeText.match(phoneRegex);
    //   if (phoneMatch) {
    //     extractedData.phone = phoneMatch[0];
    //     console.log('Extracted phone number:', extractedData.phone);
    //   } else {
    //     console.log('Phone number not found in resume text.');
    //   }
    //   // Extract Work Experience (find between headers like "Work Experience" and "Projects" or "Education")
    //   const workExperienceRegex = /Work Experience[\s\S]+?(?=Projects|Education|Skills)/i;
    //   const workExperienceMatch = resumeText.match(workExperienceRegex);
    //   if (workExperienceMatch) {
    //     extractedData.workExperience = workExperienceMatch[0].trim();
    //     console.log('Extracted work experience:', extractedData.workExperience);
    //   } else {
    //     console.log('Work experience not found in resume text.');
    //   }
    //   // Extract Projects (similar to work experience)
    //   const projectsRegex = /Projects[\s\S]+?(?=Education|Skills|Experience)/i;
    //   const projectsMatch = resumeText.match(projectsRegex);
    //   if (projectsMatch) {
    //     extractedData.projects = projectsMatch[0].trim();
    //     console.log('Extracted projects:', extractedData.projects);
    //   } else {
    //     console.log('Projects not found in resume text.');
    //   }
    //   // Optionally extract additional sections like "Skills", "Education"
    //   // Example for "Skills"
    //   const skillsRegex = /Skills[\s\S]+?(?=Projects|Work Experience|Education)/i;
    //   const skillsMatch = resumeText.match(skillsRegex);
    //   if (skillsMatch) {
    //     extractedData.skills = skillsMatch[0].trim();
    //     console.log('Extracted skills:', extractedData.skills);
    //   }
    //   return extractedData;
    // }
    ApplicationController.extractDataFromResume = function (resumeText) {
        return __awaiter(this, void 0, void 0, function () {
            var extractedData, nameRegex, nameMatch, emailRegex, emailMatch, phoneRegex, phoneMatch, workExperienceRegex, workExperienceMatch, projectsRegex, projectsMatch, educationRegex, educationMatch, skillsRegex, skillsMatch;
            return __generator(this, function (_a) {
                console.log('Extracting data from resume text...');
                extractedData = {};
                // Step 1: Normalize the text (remove unnecessary whitespaces, standardize new lines)
                resumeText = resumeText.replace(/\r?\n|\r/g, "\n").trim();
                nameRegex = /(?:Name[:\s]*)?([A-Z][a-z]+(?: [A-Z][a-z]+)+)/;
                nameMatch = resumeText.match(nameRegex);
                if (nameMatch) {
                    extractedData.name = nameMatch[1].trim();
                    console.log('Extracted name:', extractedData.name);
                }
                else {
                    console.log('Name not found in resume text.');
                }
                emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
                emailMatch = resumeText.match(emailRegex);
                if (emailMatch) {
                    extractedData.email = emailMatch[0].trim();
                    console.log('Extracted email:', extractedData.email);
                }
                else {
                    console.log('Email not found in resume text.');
                }
                phoneRegex = /(\+?\d{1,3}[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/;
                phoneMatch = resumeText.match(phoneRegex);
                if (phoneMatch) {
                    extractedData.phone = phoneMatch[0].trim();
                    console.log('Extracted phone number:', extractedData.phone);
                }
                else {
                    console.log('Phone number not found in resume text.');
                }
                workExperienceRegex = /(?:Work Experience|Experience|Professional Experience)[\s\S]+?(?=Projects|Education|Skills)/i;
                workExperienceMatch = resumeText.match(workExperienceRegex);
                if (workExperienceMatch) {
                    extractedData.workExperience = workExperienceMatch[0].trim();
                    console.log('Extracted work experience:', extractedData.workExperience);
                }
                else {
                    console.log('Work experience not found in resume text.');
                }
                projectsRegex = /(?:Projects|Project Experience|Key Projects)[\s\S]+?(?=Education|Skills|Certifications)/i;
                projectsMatch = resumeText.match(projectsRegex);
                if (projectsMatch) {
                    extractedData.projects = projectsMatch[0].trim();
                    console.log('Extracted projects:', extractedData.projects);
                }
                else {
                    console.log('Projects not found in resume text.');
                }
                educationRegex = /(?:Education|Academic Background|Degrees)[\s\S]+?(?=Skills|Certifications|Projects)/i;
                educationMatch = resumeText.match(educationRegex);
                if (educationMatch) {
                    extractedData.education = educationMatch[0].trim();
                    console.log('Extracted education:', extractedData.education);
                }
                else {
                    console.log('Education not found in resume text.');
                }
                skillsRegex = /(?:Skills|Technical Skills|Core Competencies)[\s\S]+?(?=Education|Experience|Projects|Certifications)/i;
                skillsMatch = resumeText.match(skillsRegex);
                if (skillsMatch) {
                    extractedData.skills = skillsMatch[0].trim();
                    console.log('Extracted skills:', extractedData.skills);
                }
                else {
                    console.log('Skills not found in resume text.');
                }
                return [2 /*return*/, extractedData];
            });
        });
    };
    return ApplicationController;
}());
exports.ApplicationController = ApplicationController;
