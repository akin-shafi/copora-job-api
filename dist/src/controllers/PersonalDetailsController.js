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
exports.PersonalDetailsController = void 0;
var PersonalDetailsService_1 = require("../services/PersonalDetailsService");
var UserService_1 = require("../services/UserService");
// APP-C57FF572
var PersonalDetailsController = /** @class */ (function () {
    function PersonalDetailsController() {
    }
    // Create or update PersonalDetails
    PersonalDetailsController.createPersonalDetails = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, existingApplicant, existingEntry, updatedEntry, newEntry, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        applicationNo = req.body.applicationNo;
                        return [4 /*yield*/, UserService_1.UserService.findApplicationNo(applicationNo)];
                    case 1:
                        existingApplicant = _a.sent();
                        if (!existingApplicant) {
                            return [2 /*return*/, res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' })];
                        }
                        return [4 /*yield*/, PersonalDetailsService_1.PersonalDetailsService.getByApplicationNo(applicationNo)];
                    case 2:
                        existingEntry = _a.sent();
                        if (!existingEntry) return [3 /*break*/, 4];
                        return [4 /*yield*/, PersonalDetailsService_1.PersonalDetailsService.updateByApplicationNo(applicationNo, req.body)];
                    case 3:
                        updatedEntry = _a.sent();
                        return [2 /*return*/, res.status(200).send({ message: 'Personal details updated', data: updatedEntry })];
                    case 4: return [4 /*yield*/, PersonalDetailsService_1.PersonalDetailsService.create(req.body)];
                    case 5:
                        newEntry = _a.sent();
                        return [2 /*return*/, res.status(201).send({ message: 'Personal details created', data: newEntry })];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        res.status(500).send({ message: 'Error creating or updating personal details', error: error_1.message });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // Get PersonalDetails by applicationNo
    PersonalDetailsController.getPersonalDetailsByNo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, entry, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        applicationNo = req.params.applicationNo;
                        return [4 /*yield*/, PersonalDetailsService_1.PersonalDetailsService.getByApplicationNo(applicationNo)];
                    case 1:
                        entry = _a.sent();
                        if (!entry) {
                            return [2 /*return*/, res.status(404).send({ message: 'Personal details not found' })];
                        }
                        res.status(200).send(entry);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(500).send({ message: 'Error fetching personal details', error: error_2.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Update PersonalDetails by applicationNo
    PersonalDetailsController.updatePersonalDetailsByNo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, updatedEntry, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        applicationNo = req.params.applicationNo;
                        return [4 /*yield*/, PersonalDetailsService_1.PersonalDetailsService.updateByApplicationNo(applicationNo, req.body)];
                    case 1:
                        updatedEntry = _a.sent();
                        if (!updatedEntry) {
                            return [2 /*return*/, res.status(404).send({ message: 'Personal details not found' })];
                        }
                        res.status(200).send(updatedEntry);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(400).send({ message: 'Error updating personal details', error: error_3.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Delete PersonalDetails by applicationNo
    PersonalDetailsController.deletePersonalDetailsByNo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, message, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        applicationNo = req.params.applicationNo;
                        return [4 /*yield*/, PersonalDetailsService_1.PersonalDetailsService.deleteByApplicationNo(applicationNo)];
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
    return PersonalDetailsController;
}());
exports.PersonalDetailsController = PersonalDetailsController;
