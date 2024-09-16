"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationalDetailsController = void 0;
var EducationalDetailsService_1 = require("../services/EducationalDetailsService");
var UserService_1 = require("../services/UserService");
var EducationalDetailsController = /** @class */ (function () {
    function EducationalDetailsController() {
    }
    // private static educationalDetailsService = new EducationalDetailsService();
    // Create or update educational details based on applicationNo
    EducationalDetailsController.createEducationalDetails = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, applicationNo, educationalDetails, existingApplicant, updatedEntries, newEntries, _b, _c, _d, _i, key, entry, courseOfStudy, restOfEntry, existingEntry, newEntry, error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 9, , 10]);
                        _a = req.body, applicationNo = _a.applicationNo, educationalDetails = __rest(_a, ["applicationNo"]);
                        // Validate applicationNo
                        if (!applicationNo) {
                            return [2 /*return*/, res.status(400).json({ statusCode: 400, message: 'Application number is required' })];
                        }
                        return [4 /*yield*/, UserService_1.UserService.findApplicationNo(applicationNo)];
                    case 1:
                        existingApplicant = _e.sent();
                        if (!existingApplicant) {
                            return [2 /*return*/, res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' })];
                        }
                        updatedEntries = [];
                        newEntries = [];
                        _b = educationalDetails;
                        _c = [];
                        for (_d in _b)
                            _c.push(_d);
                        _i = 0;
                        _e.label = 2;
                    case 2:
                        if (!(_i < _c.length)) return [3 /*break*/, 8];
                        _d = _c[_i];
                        if (!(_d in _b)) return [3 /*break*/, 7];
                        key = _d;
                        entry = educationalDetails[key];
                        if (!(entry && typeof entry === 'object')) return [3 /*break*/, 7];
                        courseOfStudy = entry.courseOfStudy, restOfEntry = __rest(entry, ["courseOfStudy"]);
                        if (!courseOfStudy) {
                            return [2 /*return*/, res.status(400).json({ statusCode: 400, message: 'Course of study is required' })];
                        }
                        return [4 /*yield*/, EducationalDetailsService_1.EducationalDetailsService.findByApplicationNoAndCourseOfStudy(applicationNo, courseOfStudy)];
                    case 3:
                        existingEntry = _e.sent();
                        if (!existingEntry) return [3 /*break*/, 5];
                        // Update existing entry
                        return [4 /*yield*/, EducationalDetailsService_1.EducationalDetailsService.update(existingEntry.id, __assign(__assign({}, restOfEntry), { applicationNo: applicationNo }))];
                    case 4:
                        // Update existing entry
                        _e.sent();
                        updatedEntries.push(__assign(__assign({}, existingEntry), restOfEntry));
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, EducationalDetailsService_1.EducationalDetailsService.create(__assign({ applicationNo: applicationNo }, entry))];
                    case 6:
                        newEntry = _e.sent();
                        newEntries.push(newEntry);
                        _e.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 2];
                    case 8: return [2 /*return*/, res.status(201).json({
                            message: 'Educational details processed',
                            data: { updatedEntries: updatedEntries, newEntries: newEntries }
                        })];
                    case 9:
                        error_1 = _e.sent();
                        console.error('Error creating or updating educational details:', error_1);
                        return [2 /*return*/, res.status(500).json({ message: 'Error creating or updating educational details', error: error_1.message })];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    // Get Educational Details by applicationNo
    EducationalDetailsController.getEducationalDetailsByNo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, educationalDetails, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        applicationNo = req.params.applicationNo;
                        return [4 /*yield*/, EducationalDetailsService_1.EducationalDetailsService.getEducationalDetailsByApplicationNo(applicationNo)];
                    case 1:
                        educationalDetails = _a.sent();
                        if (!educationalDetails) {
                            return [2 /*return*/, res.status(404).send({ message: 'Educational Details not found' })];
                        }
                        res.status(200).send(educationalDetails);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(500).send({ message: 'Error fetching educational details', error: error_2.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Update Educational Details by applicationNo
    EducationalDetailsController.updateEducationalDetailsByNo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, updatedEducationalDetails, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        applicationNo = req.params.applicationNo;
                        return [4 /*yield*/, EducationalDetailsService_1.EducationalDetailsService.updateEducationalDetailsByApplicationNo(applicationNo, req.body)];
                    case 1:
                        updatedEducationalDetails = _a.sent();
                        if (!updatedEducationalDetails) {
                            return [2 /*return*/, res.status(404).send({ message: 'Educational Details not found' })];
                        }
                        res.status(200).send(updatedEducationalDetails);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(400).send({ message: 'Error updating educational details', error: error_3.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Delete Educational Details by applicationNo
    EducationalDetailsController.deleteEducationalDetailsByNo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, message, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        applicationNo = req.params.applicationNo;
                        return [4 /*yield*/, EducationalDetailsService_1.EducationalDetailsService.deleteEducationalDetailsByApplicationNo(applicationNo)];
                    case 1:
                        message = _a.sent();
                        res.status(200).send({ message: message });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        res.status(404).send({ message: error_4.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return EducationalDetailsController;
}());
exports.EducationalDetailsController = EducationalDetailsController;
