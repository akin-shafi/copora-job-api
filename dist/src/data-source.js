"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
// Import all entities
var UserEntity_1 = require("./entities/UserEntity");
var ApplicationEntity_1 = require("./entities/ApplicationEntity");
var PersonalDetailsEntity_1 = require("./entities/PersonalDetailsEntity");
var GeneralInfoEntity_1 = require("./entities/GeneralInfoEntity");
var NextOfKinEntity_1 = require("./entities/NextOfKinEntity");
var ContactDetailsEntity_1 = require("./entities/ContactDetailsEntity");
var ProfessionalDetailsEntity_1 = require("./entities/ProfessionalDetailsEntity");
var EducationalDetailsEntity_1 = require("./entities/EducationalDetailsEntity");
var HealthAndDisabilityEntity_1 = require("./entities/HealthAndDisabilityEntity");
var FoodSafetyQuestionnaireEntity_1 = require("./entities/FoodSafetyQuestionnaireEntity");
var BankDetailsEntity_1 = require("./entities/BankDetailsEntity");
var AgreementConsentEntity_1 = require("./entities/AgreementConsentEntity");
var ReferenceEntity_1 = require("./entities/ReferenceEntity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres', // PostgreSQL database type
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_DATABASE || 'job_application',
    entities: [
        UserEntity_1.User,
        ApplicationEntity_1.Application,
        PersonalDetailsEntity_1.PersonalDetails,
        ContactDetailsEntity_1.ContactDetails,
        GeneralInfoEntity_1.GeneralInfo,
        NextOfKinEntity_1.NextOfKin,
        ProfessionalDetailsEntity_1.ProfessionalDetails,
        EducationalDetailsEntity_1.EducationalDetails,
        HealthAndDisabilityEntity_1.HealthAndDisability,
        FoodSafetyQuestionnaireEntity_1.FoodSafetyQuestionnaire,
        BankDetailsEntity_1.BankDetails,
        AgreementConsentEntity_1.AgreementConsent,
        ReferenceEntity_1.Reference
    ],
    synchronize: false, // Set to true in production
    logging: false,
    migrations: [],
    subscribers: [],
    ssl: {
        rejectUnauthorized: false, // This is necessary if you don't have the SSL certificate; set to true if you have it.
    },
});
exports.AppDataSource.initialize()
    .then(function () {
    console.log('Database connection established successfully.');
})
    .catch(function (error) {
    console.error('Error connecting to the database', error);
});
