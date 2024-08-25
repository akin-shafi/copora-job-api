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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationalDetailsController = void 0;
var EducationalDetailsService_1 = require("../services/EducationalDetailsService");
var EducationalDetailsController = /** @class */ (function () {
    function EducationalDetailsController() {
    }
    // Create or update educational details based on applicationNo
    EducationalDetailsController.createEducationalDetails = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, existingEducationalDetails, updatedEducationalDetails, newEducationalDetails, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        applicationNo = req.body.applicationNo;
                        return [4 /*yield*/, EducationalDetailsController.educationalDetailsService.getEducationalDetailsByApplicationNo(applicationNo)];
                    case 1:
                        existingEducationalDetails = _a.sent();
                        if (!existingEducationalDetails) return [3 /*break*/, 3];
                        return [4 /*yield*/, EducationalDetailsController.educationalDetailsService.updateEducationalDetailsByApplicationNo(applicationNo, req.body)];
                    case 2:
                        updatedEducationalDetails = _a.sent();
                        return [2 /*return*/, res.status(200).send({ message: 'Educational Details updated', data: updatedEducationalDetails })];
                    case 3: return [4 /*yield*/, EducationalDetailsController.educationalDetailsService.createEducationalDetails(req.body)];
                    case 4:
                        newEducationalDetails = _a.sent();
                        return [2 /*return*/, res.status(201).send({ message: 'Educational Details created', data: newEducationalDetails })];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        res.status(500).send({ message: 'Error creating or updating educational details', error: error_1.message });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
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
                        return [4 /*yield*/, EducationalDetailsController.educationalDetailsService.getEducationalDetailsByApplicationNo(applicationNo)];
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
                        return [4 /*yield*/, EducationalDetailsController.educationalDetailsService.updateEducationalDetailsByApplicationNo(applicationNo, req.body)];
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
                        return [4 /*yield*/, EducationalDetailsController.educationalDetailsService.deleteEducationalDetailsByApplicationNo(applicationNo)];
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
    EducationalDetailsController.educationalDetailsService = new EducationalDetailsService_1.EducationalDetailsService();
    return EducationalDetailsController;
}());
exports.EducationalDetailsController = EducationalDetailsController;
