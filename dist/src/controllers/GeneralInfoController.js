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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralInfoController = void 0;
var data_source_1 = require("../data-source");
var GeneralInfoEntity_1 = require("../entities/GeneralInfoEntity");
var GeneralInfoService_1 = require("../services/GeneralInfoService");
var UserService_1 = require("../services/UserService");
var multerConfig_1 = __importDefault(require("../multerConfig")); // Import multer config
var GeneralInfoController = /** @class */ (function () {
    function GeneralInfoController() {
        this.generalInfoRepository = data_source_1.AppDataSource.getRepository(GeneralInfoEntity_1.GeneralInfo);
    }
    GeneralInfoController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // Use Multer middleware to handle file uploads
                multerConfig_1.default.fields([
                    { name: 'level2FoodHygieneCertificateUpload', maxCount: 1 },
                    { name: 'personalLicenseCertificateUpload', maxCount: 1 },
                    { name: 'dbsCertificateUpload', maxCount: 1 }
                ])(req, res, function (err) { return __awaiter(_this, void 0, void 0, function () {
                    var applicationNo, existingApplicant, existingEntry, level2FoodHygieneCertificateUpload, personalLicenseCertificateUpload, dbsCertificateUpload, generalInfoData, updatedEntry, newEntry, savedEntry;
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    return __generator(this, function (_k) {
                        switch (_k.label) {
                            case 0:
                                if (err) {
                                    return [2 /*return*/, res.status(400).json({ statusCode: 400, message: 'File upload error', error: err.message })];
                                }
                                applicationNo = req.body.applicationNo;
                                return [4 /*yield*/, UserService_1.UserService.findApplicationNo(applicationNo)];
                            case 1:
                                existingApplicant = _k.sent();
                                if (!existingApplicant) {
                                    return [2 /*return*/, res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' })];
                                }
                                return [4 /*yield*/, GeneralInfoService_1.GeneralInfoService.getByApplicationNo(applicationNo)];
                            case 2:
                                existingEntry = _k.sent();
                                level2FoodHygieneCertificateUpload = ((_c = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a['level2FoodHygieneCertificateUpload']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.path) || null;
                                personalLicenseCertificateUpload = ((_f = (_e = (_d = req.files) === null || _d === void 0 ? void 0 : _d['personalLicenseCertificateUpload']) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.path) || null;
                                dbsCertificateUpload = ((_j = (_h = (_g = req.files) === null || _g === void 0 ? void 0 : _g['dbsCertificateUpload']) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.path) || null;
                                generalInfoData = __assign(__assign({}, req.body), { level2FoodHygieneCertificateUpload: level2FoodHygieneCertificateUpload, personalLicenseCertificateUpload: personalLicenseCertificateUpload, dbsCertificateUpload: dbsCertificateUpload });
                                if (!existingEntry) return [3 /*break*/, 4];
                                return [4 /*yield*/, GeneralInfoService_1.GeneralInfoService.updateByApplicationNo(applicationNo, generalInfoData)];
                            case 3:
                                updatedEntry = _k.sent();
                                return [2 /*return*/, res.status(200).json({ message: 'General Info updated', data: updatedEntry })];
                            case 4:
                                newEntry = this.generalInfoRepository.create(generalInfoData);
                                return [4 /*yield*/, this.generalInfoRepository.save(newEntry)];
                            case 5:
                                savedEntry = _k.sent();
                                return [2 /*return*/, res.status(201).json({ message: 'General Info created', data: savedEntry })];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    GeneralInfoController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var generalInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generalInfoRepository.find()];
                    case 1:
                        generalInfo = _a.sent();
                        res.status(200).send(generalInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    GeneralInfoController.prototype.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var generalInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generalInfoRepository.findOneBy({ id: parseInt(req.params.id) })];
                    case 1:
                        generalInfo = _a.sent();
                        if (!generalInfo) {
                            return [2 /*return*/, res.status(404).send('General Info not found')];
                        }
                        res.status(200).send(generalInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    GeneralInfoController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var generalInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generalInfoRepository.findOneBy({ id: parseInt(req.params.id) })];
                    case 1:
                        generalInfo = _a.sent();
                        if (!generalInfo) {
                            return [2 /*return*/, res.status(404).send('General Info not found')];
                        }
                        Object.assign(generalInfo, req.body);
                        return [4 /*yield*/, this.generalInfoRepository.save(generalInfo)];
                    case 2:
                        _a.sent();
                        res.status(200).send(generalInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    GeneralInfoController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generalInfoRepository.delete({ id: parseInt(req.params.id) })];
                    case 1:
                        result = _a.sent();
                        if (result.affected === 0) {
                            return [2 /*return*/, res.status(404).send('General Info not found')];
                        }
                        res.status(200).send('General Info deleted');
                        return [2 /*return*/];
                }
            });
        });
    };
    return GeneralInfoController;
}());
exports.GeneralInfoController = GeneralInfoController;
