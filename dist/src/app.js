"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var data_source_1 = require("./data-source");
var dotenv_1 = __importDefault(require("dotenv"));
var UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
var UsersPrivateRoutes_1 = __importDefault(require("./routes/UsersPrivateRoutes"));
var AgreementConsentRoutes_1 = __importDefault(require("./routes/AgreementConsentRoutes"));
var ApplicationRoutes_1 = __importDefault(require("./routes/ApplicationRoutes"));
var BankDetailsRoutes_1 = __importDefault(require("./routes/BankDetailsRoutes"));
var ContactDetailsRoutes_1 = __importDefault(require("./routes/ContactDetailsRoutes"));
var EducationalDetailsRoutes_1 = __importDefault(require("./routes/EducationalDetailsRoutes"));
var FoodSafetyQuestionnaireRoutes_1 = __importDefault(require("./routes/FoodSafetyQuestionnaireRoutes"));
var HealthAndDisabilityRoutes_1 = __importDefault(require("./routes/HealthAndDisabilityRoutes"));
var personalDetailsRoutes_1 = __importDefault(require("./routes/personalDetailsRoutes"));
var ProfessionalDetailsRoutes_1 = __importDefault(require("./routes/ProfessionalDetailsRoutes"));
var ReferenceRoutes_1 = __importDefault(require("./routes/ReferenceRoutes"));
// Import new search routes
var swagger_1 = require("../swagger");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express")); // Import swaggerUI
dotenv_1.default.config();
data_source_1.AppDataSource.initialize()
    .then(function () {
    console.log('Database connection established successfully.');
    var app = (0, express_1.default)();
    var isLocal = process.env.NODE_ENV === 'development'; // Check if running in development mode
    var port = process.env.PORT || 8000;
    var url = isLocal ? process.env.LOCAL_URL : process.env.REMOTE_URL;
    app.use((0, cors_1.default)({
        origin: [
            'http://localhost:3000', // React
            'http://localhost:8080', // Vue
            'http://localhost:4200', // Angular
            'http://localhost:5173' // Vite
        ]
    }));
    app.use(express_1.default.json());
    // Swagger setup
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
    // API routes
    var prefix = 'api';
    app.use("/users", UserRoutes_1.default);
    app.use("/auth/users", UsersPrivateRoutes_1.default);
    app.use("/agreement-consent", AgreementConsentRoutes_1.default);
    app.use("/application", ApplicationRoutes_1.default);
    app.use("/bank-details", BankDetailsRoutes_1.default);
    app.use("/contact-details", ContactDetailsRoutes_1.default);
    app.use("/education-details", EducationalDetailsRoutes_1.default);
    app.use("/food-safety", FoodSafetyQuestionnaireRoutes_1.default);
    app.use("/health-and-disability", HealthAndDisabilityRoutes_1.default);
    app.use("/personal-details", personalDetailsRoutes_1.default);
    app.use("/professional-details", ProfessionalDetailsRoutes_1.default);
    app.use("/reference", ReferenceRoutes_1.default);
    app.listen(port, function () {
        console.log("Server is running at ".concat(url));
        console.log("Swagger UI is available at ".concat(url, "/api-docs"));
    });
})
    .catch(function (error) {
    console.error('Error connecting to the database', error);
});
