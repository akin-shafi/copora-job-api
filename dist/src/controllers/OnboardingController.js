"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingController = void 0;
var ApplicationService_1 = require("../services/ApplicationService");
var OnboardingController = /** @class */ (function () {
    function OnboardingController() {
        this.applicationService = new ApplicationService_1.ApplicationService();
        // async startOnboarding(req: Request, res: Response) {
        //     try {
        //         const application = await this.applicationService.createApplication();
        //         res.status(200).send({ applicationNo: application.applicationNo });
        //     } catch (error) {
        //         res.status(500).send({ message: 'Error starting onboarding process', error });
        //     }
        // }
    }
    return OnboardingController;
}());
exports.OnboardingController = OnboardingController;
