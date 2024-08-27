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
exports.ApplicationService = void 0;
var data_source_1 = require("../data-source");
var UserEntity_1 = require("../entities/UserEntity");
var ApplicationEntity_1 = require("../entities/ApplicationEntity");
var PersonalDetailsEntity_1 = require("../entities/PersonalDetailsEntity");
var ContactDetailsEntity_1 = require("../entities/ContactDetailsEntity");
var ProfessionalDetailsEntity_1 = require("../entities/ProfessionalDetailsEntity");
var EducationalDetailsEntity_1 = require("../entities/EducationalDetailsEntity");
var HealthAndDisabilityEntity_1 = require("../entities/HealthAndDisabilityEntity");
var FoodSafetyQuestionnaireEntity_1 = require("../entities/FoodSafetyQuestionnaireEntity");
var BankDetailsEntity_1 = require("../entities/BankDetailsEntity");
var AgreementConsentEntity_1 = require("../entities/AgreementConsentEntity");
var ReferenceEntity_1 = require("../entities/ReferenceEntity");
var ApplicationService = /** @class */ (function () {
    function ApplicationService() {
    }
    ApplicationService.createApplication = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ApplicationService.updateApplicationByNo = function (applicationNo, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ApplicationService.deleteApplicationByNo = function (applicationNo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ApplicationService.getApplicationByNo = function (applicationNo) {
        return __awaiter(this, void 0, void 0, function () {
            var application, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(ApplicationEntity_1.Application).findOneBy({ applicationNo: applicationNo })];
                    case 1:
                        application = _a.sent();
                        if (!application) {
                            throw new Error('Application not found');
                        }
                        return [2 /*return*/, application];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error("Error retrieving application: ".concat(error_1.message));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationService.getApplicantData = function (applicationNo) {
        return __awaiter(this, void 0, void 0, function () {
            var user, application, personalDetails, contactDetails, professionalDetails, educationalDetails, healthAndDisability, foodSafetyQuestionnaire, bankDetails, agreementConsent, reference, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, , 13]);
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(UserEntity_1.User).findOneBy({ applicationNo: applicationNo })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(ApplicationEntity_1.Application).findOneBy({ applicationNo: applicationNo })];
                    case 2:
                        application = _a.sent();
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(PersonalDetailsEntity_1.PersonalDetails).findOneBy({ applicationNo: applicationNo })];
                    case 3:
                        personalDetails = _a.sent();
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(ContactDetailsEntity_1.ContactDetails).findOneBy({ applicationNo: applicationNo })];
                    case 4:
                        contactDetails = _a.sent();
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(ProfessionalDetailsEntity_1.ProfessionalDetails).findOneBy({ applicationNo: applicationNo })];
                    case 5:
                        professionalDetails = _a.sent();
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(EducationalDetailsEntity_1.EducationalDetails).findOneBy({ applicationNo: applicationNo })];
                    case 6:
                        educationalDetails = _a.sent();
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(HealthAndDisabilityEntity_1.HealthAndDisability).findOneBy({ applicationNo: applicationNo })];
                    case 7:
                        healthAndDisability = _a.sent();
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(FoodSafetyQuestionnaireEntity_1.FoodSafetyQuestionnaire).findOneBy({ applicationNo: applicationNo })];
                    case 8:
                        foodSafetyQuestionnaire = _a.sent();
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(BankDetailsEntity_1.BankDetails).findOneBy({ applicationNo: applicationNo })];
                    case 9:
                        bankDetails = _a.sent();
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(AgreementConsentEntity_1.AgreementConsent).findOneBy({ applicationNo: applicationNo })];
                    case 10:
                        agreementConsent = _a.sent();
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(ReferenceEntity_1.Reference).findOneBy({ applicationNo: applicationNo })];
                    case 11:
                        reference = _a.sent();
                        return [2 /*return*/, {
                                user: user,
                                application: application,
                                personalDetails: personalDetails,
                                contactDetails: contactDetails,
                                professionalDetails: professionalDetails,
                                educationalDetails: educationalDetails,
                                healthAndDisability: healthAndDisability,
                                foodSafetyQuestionnaire: foodSafetyQuestionnaire,
                                bankDetails: bankDetails,
                                agreementConsent: agreementConsent,
                                reference: reference,
                            }];
                    case 12:
                        error_2 = _a.sent();
                        throw new Error("Error retrieving applicant data: ".concat(error_2.message));
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    ApplicationService.getAllApplicants = function () {
        return __awaiter(this, void 0, void 0, function () {
            var applications, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, data_source_1.AppDataSource.getRepository(ApplicationEntity_1.Application).find()];
                    case 1:
                        applications = _a.sent();
                        return [2 /*return*/, applications];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error("Error retrieving all applicants: ".concat(error_3.message));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ApplicationService;
}());
exports.ApplicationService = ApplicationService;
