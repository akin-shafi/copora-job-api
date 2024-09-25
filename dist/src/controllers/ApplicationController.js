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
var constants_1 = require("../constants");
var pdf_parse_1 = __importDefault(require("pdf-parse"));
var json2csv_1 = require("json2csv"); // Import json2csv for converting JSON to CSV
var pdfkit_1 = __importDefault(require("pdfkit")); // For PDF generation
var ApplicationController = /** @class */ (function () {
    function ApplicationController() {
    }
    // constructor() {
    //   this.autoFillApplicationFormWithUploadedResume = this.autoFillApplicationFormWithUploadedResume.bind(this);
    // }
    ApplicationController.getOnboardingStatus = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var statuses;
            return __generator(this, function (_a) {
                console.log('Onboarding status route hit');
                statuses = Object.values(constants_1.OnboardingStatus);
                res.status(200).json({ success: true, data: statuses });
                return [2 /*return*/];
            });
        });
    };
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
    // static async downloadApplicantDataCsv(req: Request, res: Response) {
    //   try {
    //     const { applicationNo } = req.params;
    //     const applicantData = await ApplicationService.getApplicantData(applicationNo);
    //     if (!applicantData) {
    //       return res.status(404).json({ message: 'Applicant not found' });
    //     }
    //     // Combine applicant data into a single object
    //     const combinedData = {
    //       user: applicantData.user,
    //       personalDetails: applicantData.personalDetails,
    //       contactDetails: applicantData.contactDetails,
    //       professionalDetails: applicantData.professionalDetails,
    //       educationalDetails: applicantData.educationalDetails,
    //       healthAndDisability: applicantData.healthAndDisability,
    //       foodSafetyQuestionnaire: applicantData.foodSafetyQuestionnaire,
    //       bankDetails: applicantData.bankDetails,
    //       agreementConsent: applicantData.agreementConsent,
    //       reference: applicantData.reference,
    //     };
    //     // Convert the data to CSV
    //     const fields = Object.keys(combinedData);
    //     const json2csvParser = new Parser({ fields });
    //     const csv = json2csvParser.parse(combinedData);
    //     // Set headers for file download
    //     res.header('Content-Type', 'text/csv');
    //     res.attachment(`applicant_${applicationNo}.csv`);
    //     return res.send(csv);
    //   } catch (error) {
    //     return res.status(500).json({ error: error.message });
    //   }
    // }
    // New method for downloading applicant data as CSV
    ApplicationController.downloadApplicantDataCsv = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, applicantData, csvData, fields, json2csvParser, csv, error_8;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
            return __generator(this, function (_4) {
                switch (_4.label) {
                    case 0:
                        _4.trys.push([0, 2, , 3]);
                        applicationNo = req.params.applicationNo;
                        return [4 /*yield*/, ApplicationService_1.ApplicationService.getApplicantData(applicationNo)];
                    case 1:
                        applicantData = _4.sent();
                        if (!applicantData) {
                            return [2 /*return*/, res.status(404).json({ message: 'Applicant not found' })];
                        }
                        csvData = {
                            Title: (_a = applicantData.personalDetails) === null || _a === void 0 ? void 0 : _a.title,
                            Forename1: (_b = applicantData.user) === null || _b === void 0 ? void 0 : _b.firstName,
                            Forename2: (_c = applicantData.user) === null || _c === void 0 ? void 0 : _c.middleName,
                            Surname: (_d = applicantData.user) === null || _d === void 0 ? void 0 : _d.lastName,
                            PreferredName: (_e = applicantData.user) === null || _e === void 0 ? void 0 : _e.firstName,
                            Telephone: (_f = applicantData.contactDetails) === null || _f === void 0 ? void 0 : _f.phone,
                            Mobile: (_g = applicantData.contactDetails) === null || _g === void 0 ? void 0 : _g.phone, // Assuming phone is used for both
                            Email: (_h = applicantData.user) === null || _h === void 0 ? void 0 : _h.email,
                            Address: "".concat((_j = applicantData.contactDetails) === null || _j === void 0 ? void 0 : _j.street, ", ").concat((_k = applicantData.contactDetails) === null || _k === void 0 ? void 0 : _k.town, ", ").concat((_l = applicantData.contactDetails) === null || _l === void 0 ? void 0 : _l.postcode),
                            Country: (_m = applicantData.contactDetails) === null || _m === void 0 ? void 0 : _m.country,
                            Gender: (_o = applicantData.personalDetails) === null || _o === void 0 ? void 0 : _o.gender,
                            Birthday: (_p = applicantData.personalDetails) === null || _p === void 0 ? void 0 : _p.dateOfBirth,
                            PassportNumber: (_q = applicantData.personalDetails) === null || _q === void 0 ? void 0 : _q.passportPhoto, // Assuming passport photo contains passport info
                            NINumber: (_r = applicantData.personalDetails) === null || _r === void 0 ? void 0 : _r.nationalInsuranceNumber,
                            WorksNumber: '', // This field is not mapped in your data
                            Department: '', // This field is not mapped in your data
                            JobTitle: (_t = (_s = applicantData.professionalDetails) === null || _s === void 0 ? void 0 : _s[0]) === null || _t === void 0 ? void 0 : _t.jobTitle,
                            College: (_v = (_u = applicantData.educationalDetails) === null || _u === void 0 ? void 0 : _u[0]) === null || _v === void 0 ? void 0 : _v.schoolName,
                            DateStarted: (_x = (_w = applicantData.professionalDetails) === null || _w === void 0 ? void 0 : _w[0]) === null || _x === void 0 ? void 0 : _x.startDate,
                            DateLeft: (_z = (_y = applicantData.professionalDetails) === null || _y === void 0 ? void 0 : _y[0]) === null || _z === void 0 ? void 0 : _z.endDate,
                            Director: '', // This field is not mapped in your data
                            DirectorStartDate: '', // This field is not mapped in your data
                            DirectorEndDate: '', // This field is not mapped in your data
                            AlternativeDirectorsNIC: '', // This field is not mapped in your data
                            PrimaryNICOnly: '', // This field is not mapped in your data
                            PayFrequency: '', // This field is not mapped in your data
                            PayMethod: '', // This field is not mapped in your data
                            DeliveryMethod: '', // This field is not mapped in your data
                            BankName: (_0 = applicantData.bankDetails) === null || _0 === void 0 ? void 0 : _0.bankName,
                            BranchName: '', // This field is not mapped in your data
                            SortCode: (_1 = applicantData.bankDetails) === null || _1 === void 0 ? void 0 : _1.sortCode,
                            AccountName: (_2 = applicantData.bankDetails) === null || _2 === void 0 ? void 0 : _2.accountName,
                            AccountNumber: (_3 = applicantData.bankDetails) === null || _3 === void 0 ? void 0 : _3.accountNumber,
                            PaymentReference: '', // This field is not mapped in your data
                            BuildingSocietyReference: '', // This field is not mapped in your data
                            BankTelephone: '', // This field is not mapped in your data
                            BankAddress: '', // This field is not mapped in your data
                            AEExcluded: '', // This field is not mapped in your data
                            PostponedUntil: '', // This field is not mapped in your data
                            AEPension: '', // This field is not mapped in your data
                            AEJoined: '', // This field is not mapped in your data
                            AEOptedIn: '', // This field is not mapped in your data
                            AELeft: '', // This field is not mapped in your data
                            AEOptedOut: '', // This field is not mapped in your data
                            Group: '', // This field is not mapped in your data
                            EmployeePercentage: '', // This field is not mapped in your data
                            EmployerPercentage: '', // This field is not mapped in your data
                            AVCPercentage: '' // This field is not mapped in your data
                        };
                        fields = Object.keys(csvData);
                        json2csvParser = new json2csv_1.Parser({ fields: fields });
                        csv = json2csvParser.parse([csvData]);
                        // Set headers for file download
                        res.header('Content-Type', 'text/csv');
                        res.attachment("applicant_".concat(applicationNo, ".csv"));
                        return [2 /*return*/, res.send(csv)];
                    case 2:
                        error_8 = _4.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_8.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // New method for downloading all applicants' data as CSV
    ApplicationController.downloadAllApplicantsCsv = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allApplicants, csvData, fields, json2csvParser, csv, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ApplicationService_1.ApplicationService.getAllApplicantsData()];
                    case 1:
                        allApplicants = _a.sent();
                        if (!allApplicants || allApplicants.length === 0) {
                            return [2 /*return*/, res.status(404).json({ message: 'No applicants found' })];
                        }
                        csvData = allApplicants.map(function (applicant) {
                            var _a, _b, _c, _d;
                            var personalDetails = applicant.personalDetails, user = applicant.user, contactDetails = applicant.contactDetails, professionalDetails = applicant.professionalDetails, educationalDetails = applicant.educationalDetails, bankDetails = applicant.bankDetails;
                            return {
                                Title: personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails.title,
                                Forename1: user === null || user === void 0 ? void 0 : user.firstName,
                                Forename2: user === null || user === void 0 ? void 0 : user.middleName,
                                Surname: user === null || user === void 0 ? void 0 : user.lastName,
                                PreferredName: user === null || user === void 0 ? void 0 : user.firstName,
                                Telephone: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.phone,
                                Mobile: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.phone, // Assuming phone is used for both
                                Email: user === null || user === void 0 ? void 0 : user.email,
                                Address: "".concat(contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.street, ", ").concat(contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.town, ", ").concat(contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.postcode),
                                Country: contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.country,
                                Gender: personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails.gender,
                                Birthday: personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails.dateOfBirth,
                                PassportNumber: personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails.passportPhoto, // Assuming passport photo contains passport info
                                NINumber: personalDetails === null || personalDetails === void 0 ? void 0 : personalDetails.nationalInsuranceNumber,
                                WorksNumber: '', // Not mapped
                                Department: '', // Not mapped
                                JobTitle: (_a = professionalDetails === null || professionalDetails === void 0 ? void 0 : professionalDetails[0]) === null || _a === void 0 ? void 0 : _a.jobTitle,
                                College: (_b = educationalDetails === null || educationalDetails === void 0 ? void 0 : educationalDetails[0]) === null || _b === void 0 ? void 0 : _b.schoolName,
                                DateStarted: (_c = professionalDetails === null || professionalDetails === void 0 ? void 0 : professionalDetails[0]) === null || _c === void 0 ? void 0 : _c.startDate,
                                DateLeft: (_d = professionalDetails === null || professionalDetails === void 0 ? void 0 : professionalDetails[0]) === null || _d === void 0 ? void 0 : _d.endDate,
                                Director: '', // Not mapped
                                DirectorStartDate: '', // Not mapped
                                DirectorEndDate: '', // Not mapped
                                AlternativeDirectorsNIC: '', // Not mapped
                                PrimaryNICOnly: '', // Not mapped
                                PayFrequency: '', // Not mapped
                                PayMethod: '', // Not mapped
                                DeliveryMethod: '', // Not mapped
                                BankName: bankDetails === null || bankDetails === void 0 ? void 0 : bankDetails.bankName,
                                BranchName: '', // Not mapped
                                SortCode: bankDetails === null || bankDetails === void 0 ? void 0 : bankDetails.sortCode,
                                AccountName: bankDetails === null || bankDetails === void 0 ? void 0 : bankDetails.accountName,
                                AccountNumber: bankDetails === null || bankDetails === void 0 ? void 0 : bankDetails.accountNumber,
                                PaymentReference: '', // Not mapped
                                BuildingSocietyReference: '', // Not mapped
                                BankTelephone: '', // Not mapped
                                BankAddress: '', // Not mapped
                                AEExcluded: '', // Not mapped
                                PostponedUntil: '', // Not mapped
                                AEPension: '', // Not mapped
                                AEJoined: '', // Not mapped
                                AEOptedIn: '', // Not mapped
                                AELeft: '', // Not mapped
                                AEOptedOut: '', // Not mapped
                                Group: '', // Not mapped
                                EmployeePercentage: '', // Not mapped
                                EmployerPercentage: '', // Not mapped
                                AVCPercentage: '' // Not mapped
                            };
                        });
                        fields = Object.keys(csvData[0]);
                        json2csvParser = new json2csv_1.Parser({ fields: fields });
                        csv = json2csvParser.parse(csvData);
                        // Set headers for file download
                        res.header('Content-Type', 'text/csv');
                        res.attachment('all_applicants.csv');
                        return [2 /*return*/, res.send(csv)];
                    case 2:
                        error_9 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_9.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // New method for downloading applicant data as PDF
    ApplicationController.downloadApplicantDataPdf = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, applicantData, doc, error_10;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
            return __generator(this, function (_4) {
                switch (_4.label) {
                    case 0:
                        _4.trys.push([0, 2, , 3]);
                        applicationNo = req.params.applicationNo;
                        return [4 /*yield*/, ApplicationService_1.ApplicationService.getApplicantData(applicationNo)];
                    case 1:
                        applicantData = _4.sent();
                        if (!applicantData) {
                            return [2 /*return*/, res.status(404).json({ message: 'Applicant not found' })];
                        }
                        doc = new pdfkit_1.default();
                        // Set response headers for PDF download
                        res.setHeader('Content-disposition', "attachment; filename=\"applicant_".concat(applicationNo, ".pdf\""));
                        res.setHeader('Content-type', 'application/pdf');
                        // Pipe the PDF into the response
                        doc.pipe(res);
                        // Add content to the PDF
                        doc.fontSize(18).text("Applicant Data - ".concat(applicationNo), { align: 'center' });
                        doc.moveDown();
                        // Add applicant data to PDF
                        doc.fontSize(12).text("Title: ".concat(((_a = applicantData.personalDetails) === null || _a === void 0 ? void 0 : _a.title) || 'N/A'));
                        doc.text("Forename1: ".concat(((_b = applicantData.user) === null || _b === void 0 ? void 0 : _b.firstName) || 'N/A'));
                        doc.text("Forename2: ".concat(((_c = applicantData.user) === null || _c === void 0 ? void 0 : _c.middleName) || 'N/A'));
                        doc.text("Surname: ".concat(((_d = applicantData.user) === null || _d === void 0 ? void 0 : _d.lastName) || 'N/A'));
                        doc.text("PreferredName: ".concat(((_e = applicantData.user) === null || _e === void 0 ? void 0 : _e.firstName) || 'N/A'));
                        doc.text("Telephone: ".concat(((_f = applicantData.contactDetails) === null || _f === void 0 ? void 0 : _f.phone) || 'N/A'));
                        doc.text("Mobile: ".concat(((_g = applicantData.contactDetails) === null || _g === void 0 ? void 0 : _g.phone) || 'N/A'));
                        doc.text("Email: ".concat(((_h = applicantData.user) === null || _h === void 0 ? void 0 : _h.email) || 'N/A'));
                        doc.text("Address: ".concat(((_j = applicantData.contactDetails) === null || _j === void 0 ? void 0 : _j.street) || 'N/A', ", ").concat(((_k = applicantData.contactDetails) === null || _k === void 0 ? void 0 : _k.town) || 'N/A', ", ").concat(((_l = applicantData.contactDetails) === null || _l === void 0 ? void 0 : _l.postcode) || 'N/A'));
                        doc.text("Country: ".concat(((_m = applicantData.contactDetails) === null || _m === void 0 ? void 0 : _m.country) || 'N/A'));
                        doc.text("Gender: ".concat(((_o = applicantData.personalDetails) === null || _o === void 0 ? void 0 : _o.gender) || 'N/A'));
                        doc.text("Birthday: ".concat(((_p = applicantData.personalDetails) === null || _p === void 0 ? void 0 : _p.dateOfBirth) || 'N/A'));
                        doc.text("PassportNumber: ".concat(((_q = applicantData.personalDetails) === null || _q === void 0 ? void 0 : _q.passportPhoto) || 'N/A'));
                        doc.text("NINumber: ".concat(((_r = applicantData.personalDetails) === null || _r === void 0 ? void 0 : _r.nationalInsuranceNumber) || 'N/A'));
                        doc.text("JobTitle: ".concat(((_t = (_s = applicantData.professionalDetails) === null || _s === void 0 ? void 0 : _s[0]) === null || _t === void 0 ? void 0 : _t.jobTitle) || 'N/A'));
                        doc.text("College: ".concat(((_v = (_u = applicantData.educationalDetails) === null || _u === void 0 ? void 0 : _u[0]) === null || _v === void 0 ? void 0 : _v.schoolName) || 'N/A'));
                        doc.text("DateStarted: ".concat(((_x = (_w = applicantData.professionalDetails) === null || _w === void 0 ? void 0 : _w[0]) === null || _x === void 0 ? void 0 : _x.startDate) || 'N/A'));
                        doc.text("DateLeft: ".concat(((_z = (_y = applicantData.professionalDetails) === null || _y === void 0 ? void 0 : _y[0]) === null || _z === void 0 ? void 0 : _z.endDate) || 'N/A'));
                        doc.text("BankName: ".concat(((_0 = applicantData.bankDetails) === null || _0 === void 0 ? void 0 : _0.bankName) || 'N/A'));
                        doc.text("SortCode: ".concat(((_1 = applicantData.bankDetails) === null || _1 === void 0 ? void 0 : _1.sortCode) || 'N/A'));
                        doc.text("AccountName: ".concat(((_2 = applicantData.bankDetails) === null || _2 === void 0 ? void 0 : _2.accountName) || 'N/A'));
                        doc.text("AccountNumber: ".concat(((_3 = applicantData.bankDetails) === null || _3 === void 0 ? void 0 : _3.accountNumber) || 'N/A'));
                        // Finalize the PDF and end the stream
                        doc.end();
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _4.sent();
                        return [2 /*return*/, res.status(500).json({ error: error_10.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ApplicationController;
}());
exports.ApplicationController = ApplicationController;
