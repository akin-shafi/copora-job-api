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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationalDetailsService = void 0;
var EducationalDetailsEntity_1 = require("../entities/EducationalDetailsEntity");
var data_source_1 = require("../data-source");
var educationalDetailsRepository = data_source_1.AppDataSource.getRepository(EducationalDetailsEntity_1.EducationalDetails);
var EducationalDetailsService = /** @class */ (function () {
    function EducationalDetailsService() {
    }
    // Find educational details by course of study
    EducationalDetailsService.findByApplicationNoAndCourseOfStudy = function (applicationNo, courseOfStudy) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, educationalDetailsRepository.findOne({
                                where: {
                                    applicationNo: applicationNo,
                                    courseOfStudy: courseOfStudy
                                }
                            })];
                    case 1: 
                    // Find educational details by both applicationNo and courseOfStudy
                    return [2 /*return*/, _a.sent()];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error("Error finding educational details by application number and course of study: ".concat(error_1.message));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Create a new educational detail
    EducationalDetailsService.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var educationalDetail, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        educationalDetail = educationalDetailsRepository.create(data);
                        return [4 /*yield*/, educationalDetailsRepository.save(educationalDetail)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error("Error creating educational details: ".concat(error_2.message));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Update existing educational detail by id
    EducationalDetailsService.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, educationalDetailsRepository.update(id, data)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, educationalDetailsRepository.findOneBy({ id: id })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Error updating educational details: ".concat(error_3.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Get EducationalDetails by applicationNo
    EducationalDetailsService.getEducationalDetailsByApplicationNo = function (applicationNo) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, educationalDetailsRepository.find({ where: { applicationNo: applicationNo } })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error("Error fetching educational details: ".concat(error_4.message));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Update existing educational details by applicationNo
    EducationalDetailsService.updateEducationalDetailsByApplicationNo = function (applicationNo, data) {
        return __awaiter(this, void 0, void 0, function () {
            var existingDetails, updatedEntries, _i, existingDetails_1, detail, updatedDetail, _a, _b, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, educationalDetailsRepository.find({ where: { applicationNo: applicationNo } })];
                    case 1:
                        existingDetails = _c.sent();
                        if (!existingDetails.length) {
                            throw new Error('Educational Details not found');
                        }
                        updatedEntries = [];
                        _i = 0, existingDetails_1 = existingDetails;
                        _c.label = 2;
                    case 2:
                        if (!(_i < existingDetails_1.length)) return [3 /*break*/, 6];
                        detail = existingDetails_1[_i];
                        updatedDetail = __assign(__assign({}, detail), data);
                        return [4 /*yield*/, educationalDetailsRepository.update(detail.id, updatedDetail)];
                    case 3:
                        _c.sent();
                        _b = (_a = updatedEntries).push;
                        return [4 /*yield*/, educationalDetailsRepository.findOneBy({ id: detail.id })];
                    case 4:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, updatedEntries];
                    case 7:
                        error_5 = _c.sent();
                        throw new Error("Error updating educational details: ".concat(error_5.message));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // Delete EducationalDetails by applicationNo
    EducationalDetailsService.deleteEducationalDetailsByApplicationNo = function (applicationNo) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, educationalDetailsRepository.delete({ applicationNo: applicationNo })];
                    case 1:
                        result = _a.sent();
                        if (result.affected === 0) {
                            throw new Error('Educational Details not found');
                        }
                        return [2 /*return*/, 'Educational Details deleted'];
                    case 2:
                        error_6 = _a.sent();
                        throw new Error("Error deleting educational details: ".concat(error_6.message));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return EducationalDetailsService;
}());
exports.EducationalDetailsService = EducationalDetailsService;
