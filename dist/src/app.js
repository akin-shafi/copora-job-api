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
var rateLimiter_1 = __importDefault(require("./middlewares/rateLimiter")); // Import the rate limiter middleware
var UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
var UsersPrivateRoutes_1 = __importDefault(require("./routes/UsersPrivateRoutes"));
var ApplicationRoutes_1 = __importDefault(require("./routes/ApplicationRoutes"));
var AgreementConsentRoutes_1 = __importDefault(require("./routes/AgreementConsentRoutes"));
var ApplicationRoutes_2 = __importDefault(require("./routes/ApplicationRoutes"));
var BankDetailsRoutes_1 = __importDefault(require("./routes/BankDetailsRoutes"));
var NextOfKinRoutes_1 = __importDefault(require("./routes/NextOfKinRoutes"));
var GeneralInfoRoutes_1 = __importDefault(require("./routes/GeneralInfoRoutes"));
var ContactDetailsRoutes_1 = __importDefault(require("./routes/ContactDetailsRoutes"));
var EducationalDetailsRoutes_1 = __importDefault(require("./routes/EducationalDetailsRoutes"));
var FoodSafetyQuestionnaireRoutes_1 = __importDefault(require("./routes/FoodSafetyQuestionnaireRoutes"));
var HealthAndDisabilityRoutes_1 = __importDefault(require("./routes/HealthAndDisabilityRoutes"));
var personalDetailsRoutes_1 = __importDefault(require("./routes/personalDetailsRoutes"));
var ProfessionalDetailsRoutes_1 = __importDefault(require("./routes/ProfessionalDetailsRoutes"));
var ReferenceRoutes_1 = __importDefault(require("./routes/ReferenceRoutes"));
var express_winston_1 = __importDefault(require("express-winston"));
var logger_1 = __importDefault(require("./utils/logger")); // Corrected path
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_1 = require("../swagger");
// const Sentry = require("@sentry/node");
// Sentry.init({
// 	dsn: "https://34b0227e37c718d30bd3221515db17a7@o4507842016509952.ingest.de.sentry.io/4507842022801488",
//   tracesSampleRate: 1.0,
// });
dotenv_1.default.config();
data_source_1.AppDataSource.initialize()
    .then(function () {
    console.log('Database connection established successfully.');
    var app = (0, express_1.default)();
    var isLocal = process.env.NODE_ENV === 'development'; // Check if running in development mode
    var port = process.env.PORT || 8000;
    var url = isLocal ? process.env.LOCAL_URL : process.env.REMOTE_URL;
    // Trust the proxy (important when running behind a load balancer or proxy)
    // app.set('trust proxy', true);  // Add this line
    app.set('trust proxy', 1); // Trust the first proxy (like Nginx)
    app.use((0, cors_1.default)({
        origin: [
            'http://localhost:3000', // React
            'http://localhost:8080', // Vue
            'http://localhost:4200', // Angular
            'http://localhost:5173', // Vite
            'https://coporasystem-fe.vercel.app'
        ]
    }));
    app.use(express_1.default.json());
    // Apply the rate limiter globally
    app.use(rateLimiter_1.default);
    // Request logging with Winston
    app.use(express_winston_1.default.logger({
        winstonInstance: logger_1.default,
        meta: true, // Add meta data about the request
        msg: "HTTP {{req.method}} {{req.url}}", // Customize the logging message
        colorize: false,
        ignoreRoute: function (req, res) { return false; } // Ignore logging some routes
    }));
    // API routes
    app.use("/users", UserRoutes_1.default);
    app.use("/applicant", ApplicationRoutes_1.default);
    app.use("/auth/users", UsersPrivateRoutes_1.default);
    app.use("/agreement-consent", AgreementConsentRoutes_1.default);
    app.use("/application", ApplicationRoutes_2.default);
    app.use("/bank-details", BankDetailsRoutes_1.default);
    app.use("/contact-details", ContactDetailsRoutes_1.default);
    app.use("/next-of-kin", NextOfKinRoutes_1.default);
    app.use("/general-info", GeneralInfoRoutes_1.default);
    app.use("/educational-details", EducationalDetailsRoutes_1.default);
    app.use("/food-safety-questionnaire", FoodSafetyQuestionnaireRoutes_1.default);
    app.use("/health-and-disability", HealthAndDisabilityRoutes_1.default);
    app.use("/personal-details", personalDetailsRoutes_1.default);
    app.use("/professional-details", ProfessionalDetailsRoutes_1.default);
    app.use("/reference", ReferenceRoutes_1.default);
    // Swagger setup
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
    // Error logging with Winston
    app.use(express_winston_1.default.errorLogger({
        winstonInstance: logger_1.default
    }));
    // Global error handler (optional)
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
    app.listen(port, function () {
        console.log("Server is running at ".concat(url));
        console.log("Swagger UI is available at ".concat(url, "/api-docs"));
    });
})
    .catch(function (error) {
    console.error('Error connecting to the database', error);
});
