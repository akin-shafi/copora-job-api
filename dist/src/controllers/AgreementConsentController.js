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
exports.AgreementConsentController = void 0;
var AgreementConsentService_1 = require("../services/AgreementConsentService");
var UserService_1 = require("../services/UserService");
var emailActions_1 = require("../lib/emailActions");
var constants_1 = require("../constants");
var AgreementConsentController = /** @class */ (function () {
    function AgreementConsentController() {
    }
    // Create or update an AgreementConsent
    AgreementConsentController.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, existingApplicant, existingAgreementConsent, agreementConsent, userEmail, emailData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        applicationNo = req.body.applicationNo;
                        return [4 /*yield*/, UserService_1.UserService.findApplicationNo(applicationNo)];
                    case 1:
                        existingApplicant = _a.sent();
                        if (!existingApplicant) {
                            return [2 /*return*/, res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' })];
                        }
                        return [4 /*yield*/, AgreementConsentService_1.AgreementConsentService.getByApplicationNo(applicationNo)];
                    case 2:
                        existingAgreementConsent = _a.sent();
                        agreementConsent = void 0;
                        if (!existingAgreementConsent) return [3 /*break*/, 4];
                        return [4 /*yield*/, AgreementConsentService_1.AgreementConsentService.updateByApplicationNo(applicationNo, req.body)];
                    case 3:
                        // If it exists, update the existing record
                        agreementConsent = _a.sent();
                        res.status(200).send({ message: 'Agreement Consent updated', data: agreementConsent });
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, AgreementConsentService_1.AgreementConsentService.create(req.body)];
                    case 5:
                        // If it does not exist, create a new record
                        agreementConsent = _a.sent();
                        res.status(201).send({ message: 'Agreement Consent created', data: agreementConsent });
                        _a.label = 6;
                    case 6: 
                    // Update the user's onboarding status to "OnboardingCompleted"
                    // existingApplicant.onboardingStatus = OnboardingStatus.OnboardingCompleted;
                    return [4 /*yield*/, UserService_1.UserService.updateOnboardingStatus(applicationNo, constants_1.OnboardingStatus.OnboardingCompleted)];
                    case 7:
                        // Update the user's onboarding status to "OnboardingCompleted"
                        // existingApplicant.onboardingStatus = OnboardingStatus.OnboardingCompleted;
                        _a.sent();
                        userEmail = existingApplicant.email;
                        emailData = {
                            firstName: existingApplicant.firstName,
                            email: userEmail,
                        };
                        return [4 /*yield*/, (0, emailActions_1.sendOnboardingCompletionEmail)(emailData)];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        error_1 = _a.sent();
                        res.status(500).send({ message: 'Error creating or updating Agreement Consent', error: error_1.message });
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    // Get AgreementConsent by applicationNo
    AgreementConsentController.getAgreementConsentByNo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, agreementConsent, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        applicationNo = req.params.applicationNo;
                        return [4 /*yield*/, AgreementConsentService_1.AgreementConsentService.getByApplicationNo(applicationNo)];
                    case 1:
                        agreementConsent = _a.sent();
                        if (!agreementConsent) {
                            return [2 /*return*/, res.status(404).send({ message: 'Agreement Consent not found' })];
                        }
                        res.status(200).send(agreementConsent);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(500).send({ message: 'Error fetching Agreement Consent', error: error_2.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Update AgreementConsent by applicationNo
    AgreementConsentController.updateAgreementConsentByNo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, updatedAgreementConsent, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        applicationNo = req.params.applicationNo;
                        return [4 /*yield*/, AgreementConsentService_1.AgreementConsentService.updateByApplicationNo(applicationNo, req.body)];
                    case 1:
                        updatedAgreementConsent = _a.sent();
                        if (!updatedAgreementConsent) {
                            return [2 /*return*/, res.status(404).send({ message: 'Agreement Consent not found' })];
                        }
                        res.status(200).send(updatedAgreementConsent);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(400).send({ message: 'Error updating Agreement Consent', error: error_3.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Delete AgreementConsent by applicationNo
    AgreementConsentController.deleteAgreementConsentByNo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, message, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        applicationNo = req.params.applicationNo;
                        return [4 /*yield*/, AgreementConsentService_1.AgreementConsentService.deleteByApplicationNo(applicationNo)];
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
    return AgreementConsentController;
}());
exports.AgreementConsentController = AgreementConsentController;
