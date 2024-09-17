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
exports.ReferenceController = void 0;
var ReferenceService_1 = require("../services/ReferenceService");
var UserService_1 = require("../services/UserService");
var ReferenceController = /** @class */ (function () {
    function ReferenceController() {
    }
    // Create or update Reference
    ReferenceController.createOrUpdateReference = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, applicationNo, employerName, contactName, phone, email, address, existingApplicant, existingReference, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        _a = req.body, applicationNo = _a.applicationNo, employerName = _a.employerName, contactName = _a.contactName, phone = _a.phone, email = _a.email, address = _a.address;
                        // Validate required fields
                        if (!applicationNo) {
                            return [2 /*return*/, res.status(400).json({ statusCode: 400, message: 'Application number is required' })];
                        }
                        if (!phone) {
                            return [2 /*return*/, res.status(400).json({ statusCode: 400, message: 'Reference contact phone is required' })];
                        }
                        return [4 /*yield*/, UserService_1.UserService.findApplicationNo(applicationNo)];
                    case 1:
                        existingApplicant = _b.sent();
                        if (!existingApplicant) {
                            return [2 /*return*/, res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' })];
                        }
                        return [4 /*yield*/, ReferenceService_1.ReferenceService.findByApplicationNoAndPhone(applicationNo, phone)];
                    case 2:
                        existingReference = _b.sent();
                        result = void 0;
                        if (!existingReference) return [3 /*break*/, 4];
                        return [4 /*yield*/, ReferenceService_1.ReferenceService.update(existingReference.id, {
                                applicationNo: applicationNo,
                                employerName: employerName,
                                contactName: contactName,
                                phone: phone,
                                email: email,
                                address: address
                            })];
                    case 3:
                        // Update existing reference
                        result = _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, ReferenceService_1.ReferenceService.create({
                            applicationNo: applicationNo,
                            employerName: employerName,
                            contactName: contactName,
                            phone: phone,
                            email: email,
                            address: address
                        })];
                    case 5:
                        // Create new reference
                        result = _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/, res.status(201).json({
                            message: 'Reference details processed successfully',
                            data: result
                        })];
                    case 7:
                        error_1 = _b.sent();
                        console.error('Error creating or updating reference details:', error_1);
                        res.status(500).json({ message: 'Error creating or updating reference details', error: error_1.message });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // Get Reference by applicationNo
    ReferenceController.getReferenceByNo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, reference, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        applicationNo = req.params.applicationNo;
                        return [4 /*yield*/, ReferenceService_1.ReferenceService.getByApplicationNo(applicationNo)];
                    case 1:
                        reference = _a.sent();
                        if (!reference) {
                            return [2 /*return*/, res.status(404).send({ message: 'Reference not found' })];
                        }
                        res.status(200).send(reference);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(500).send({ message: 'Error fetching reference', error: error_2.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Update Reference by applicationNo
    ReferenceController.updateReferenceByNo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, updatedReference, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        applicationNo = req.params.applicationNo;
                        return [4 /*yield*/, ReferenceService_1.ReferenceService.updateByApplicationNo(applicationNo, req.body)];
                    case 1:
                        updatedReference = _a.sent();
                        if (!updatedReference) {
                            return [2 /*return*/, res.status(404).send({ message: 'Reference not found' })];
                        }
                        res.status(200).send({ message: 'Reference created successfully', data: updatedReference });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(400).send({ message: 'Error updating reference', error: error_3.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Delete Reference by applicationNo
    ReferenceController.deleteReferenceByNo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, message, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        applicationNo = req.params.applicationNo;
                        return [4 /*yield*/, ReferenceService_1.ReferenceService.deleteByApplicationNo(applicationNo)];
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
    return ReferenceController;
}());
exports.ReferenceController = ReferenceController;
