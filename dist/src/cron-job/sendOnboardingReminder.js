"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserService_1 = require("../services/UserService");
var emailActions_1 = require("../lib/emailActions");
// Initialize UserService
var userService = new UserService_1.UserService();
// Schedule the task to run at 11 PM daily
// cron.schedule('0 23 * * *', async () => { 
// cron.schedule('*/5 * * * * *', async () => { // 5 secs
// cron.schedule('0 */11 * * *', async () => {
try {
    // Query users with onboardingStep less than 5 and role is applicant
    var users = await userService.findUsersWithIncompleteOnboarding();
    if (users.length > 0) {
        console.log("Found ".concat(users.length, " users with incomplete onboarding"));
        // Send reminder emails
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var user = users_1[_i];
            var emailData = {
                firstName: user.firstName,
                email: user.email,
            };
            await (0, emailActions_1.sendOnboardingReminderEmail)(emailData);
        }
        console.log('Reminder emails sent successfully.');
    }
    else {
        console.log('No users found with incomplete onboarding.');
    }
}
catch (error) {
    console.error('Error running the onboarding reminder script:', error);
}
// });
