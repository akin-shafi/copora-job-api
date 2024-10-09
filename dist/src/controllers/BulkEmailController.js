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
const emailActions_1 = require("../lib/emailActions"); // Utility for sending bulk emails in batches
class BulkEmailController {
    constructor() {
        this.sendBulkEmail = this.sendBulkEmail.bind(this);
    }
    /**
     * Sends bulk emails to users based on filters like onboardingStatus and state.
     */
    sendBulkEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { emails, customSubject, customContent } = req.body;
                // Validate the required fields
                if (!emails || !Array.isArray(emails) || emails.length === 0) {
                    return res.status(400).json({ message: 'Emails array is required and should not be empty.' });
                }
                if (!customSubject || !customContent) {
                    return res.status(400).json({ message: 'Subject and content are required for bulk email.' });
                }
                // Send bulk email in batches
                yield (0, emailActions_1.sendEmailsInBatches)(emails.map(email => ({ email })), customSubject, customContent);
                return res.status(200).json({
                    message: 'Bulk email sent successfully.',
                    recipients: emails,
                });
            }
            catch (error) {
                console.error('Error sending bulk email:', error);
                return res.status(500).json({ message: 'Server error', error: error.message });
            }
        });
    }
}
exports.default = new BulkEmailController();
