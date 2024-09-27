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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceController = void 0;
const ReferenceService_1 = require("../services/ReferenceService");
const UserService_1 = require("../services/UserService");
class ReferenceController {
    // Create or update Reference
    static createOrUpdateReference(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo, employerName, contactName, phone, email, address } = req.body;
                // Validate required fields
                if (!applicationNo) {
                    return res.status(400).json({ statusCode: 400, message: 'Application number is required' });
                }
                if (!phone) {
                    return res.status(400).json({ statusCode: 400, message: 'Reference contact phone is required' });
                }
                // Check if applicant exists
                const existingApplicant = yield UserService_1.UserService.findApplicationNo(applicationNo);
                if (!existingApplicant) {
                    return res.status(400).json({ statusCode: 400, message: 'Applicant does not exist' });
                }
                // Check if reference already exists by phone number
                const existingReference = yield ReferenceService_1.ReferenceService.findByApplicationNoAndPhone(applicationNo, phone);
                let result;
                if (existingReference) {
                    // Update existing reference
                    result = yield ReferenceService_1.ReferenceService.update(existingReference.id, {
                        applicationNo,
                        employerName,
                        contactName,
                        phone,
                        email,
                        address
                    });
                }
                else {
                    // Create new reference
                    result = yield ReferenceService_1.ReferenceService.create({
                        applicationNo,
                        employerName,
                        contactName,
                        phone,
                        email,
                        address
                    });
                }
                return res.status(201).json({
                    message: 'Reference details processed successfully',
                    data: result
                });
            }
            catch (error) {
                console.error('Error creating or updating reference details:', error);
                res.status(500).json({ message: 'Error creating or updating reference details', error: error.message });
            }
        });
    }
    // Get Reference by applicationNo
    static getReferenceByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const reference = yield ReferenceService_1.ReferenceService.getByApplicationNo(applicationNo);
                if (!reference) {
                    return res.status(404).send({ message: 'Reference not found' });
                }
                res.status(200).send(reference);
            }
            catch (error) {
                res.status(500).send({ message: 'Error fetching reference', error: error.message });
            }
        });
    }
    // Update Reference by applicationNo
    static updateReferenceByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const updatedReference = yield ReferenceService_1.ReferenceService.updateByApplicationNo(applicationNo, req.body);
                if (!updatedReference) {
                    return res.status(404).send({ message: 'Reference not found' });
                }
                res.status(200).send({ message: 'Reference created successfully', data: updatedReference });
            }
            catch (error) {
                res.status(400).send({ message: 'Error updating reference', error: error.message });
            }
        });
    }
    // Delete Reference by applicationNo
    static deleteReferenceByNo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { applicationNo } = req.params;
                const message = yield ReferenceService_1.ReferenceService.deleteByApplicationNo(applicationNo);
                res.status(200).send({ message });
            }
            catch (error) {
                res.status(404).send({ message: error.message });
            }
        });
    }
}
exports.ReferenceController = ReferenceController;
