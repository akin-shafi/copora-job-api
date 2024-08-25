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
exports.NextOfKinController = void 0;
var data_source_1 = require("../data-source");
var NextOfKinEntity_1 = require("../entities/NextOfKinEntity");
var UserService_1 = require("../services/UserService");
var NextOfKinController = /** @class */ (function () {
    function NextOfKinController() {
        this.nextOfKinRepository = data_source_1.AppDataSource.getRepository(NextOfKinEntity_1.NextOfKin);
    }
    NextOfKinController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var applicationNo, existingApplicant, existingEntry, nextOfKin, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        applicationNo = req.body.applicationNo;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, UserService_1.UserService.findApplicationNo(applicationNo)];
                    case 2:
                        existingApplicant = _a.sent();
                        if (!existingApplicant) {
                            return [2 /*return*/, res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' })];
                        }
                        return [4 /*yield*/, this.nextOfKinRepository.findOneBy({ applicationNo: applicationNo })];
                    case 3:
                        existingEntry = _a.sent();
                        if (!existingEntry) return [3 /*break*/, 5];
                        // Update the existing entry with the new data
                        this.nextOfKinRepository.merge(existingEntry, req.body);
                        return [4 /*yield*/, this.nextOfKinRepository.save(existingEntry)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send({ message: 'Next of Kin updated', data: existingEntry })]; // Return updated entry
                    case 5:
                        nextOfKin = this.nextOfKinRepository.create(req.body);
                        return [4 /*yield*/, this.nextOfKinRepository.save(nextOfKin)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, res.status(201).send({ message: 'Entry created', data: nextOfKin })]; // Return newly created entry
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        console.error('Error creating/updating NextOfKin:', error_1);
                        return [2 /*return*/, res.status(500).send({ message: 'Internal Server Error' })];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    NextOfKinController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var nextOfKin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nextOfKinRepository.find()];
                    case 1:
                        nextOfKin = _a.sent();
                        res.status(200).send(nextOfKin);
                        return [2 /*return*/];
                }
            });
        });
    };
    NextOfKinController.prototype.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var nextOfKin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nextOfKinRepository.findOneBy({ id: parseInt(req.params.id) })];
                    case 1:
                        nextOfKin = _a.sent();
                        if (!nextOfKin) {
                            return [2 /*return*/, res.status(404).send('Next of Kin not found')];
                        }
                        res.status(200).send(nextOfKin);
                        return [2 /*return*/];
                }
            });
        });
    };
    NextOfKinController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var nextOfKin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nextOfKinRepository.findOneBy({ id: parseInt(req.params.id) })];
                    case 1:
                        nextOfKin = _a.sent();
                        if (!nextOfKin) {
                            return [2 /*return*/, res.status(404).send('Next of Kin not found')];
                        }
                        Object.assign(nextOfKin, req.body);
                        return [4 /*yield*/, this.nextOfKinRepository.save(nextOfKin)];
                    case 2:
                        _a.sent();
                        res.status(200).send(nextOfKin);
                        return [2 /*return*/];
                }
            });
        });
    };
    NextOfKinController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nextOfKinRepository.delete({ id: parseInt(req.params.id) })];
                    case 1:
                        result = _a.sent();
                        if (result.affected === 0) {
                            return [2 /*return*/, res.status(404).send('Next of Kin not found')];
                        }
                        res.status(200).send('Next of Kin deleted');
                        return [2 /*return*/];
                }
            });
        });
    };
    return NextOfKinController;
}());
exports.NextOfKinController = NextOfKinController;
