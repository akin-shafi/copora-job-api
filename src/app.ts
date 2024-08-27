import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv';
import rateLimiter from './middlewares/rateLimiter'; // Import the rate limiter middleware
import userRoutes from './routes/UserRoutes';
import userPrivateRoutes from './routes/UsersPrivateRoutes';
import AgreementConsentRoutes from './routes/AgreementConsentRoutes';
import ApplicationRoutes from './routes/ApplicationRoutes';
import BankDetailsRoutes from './routes/BankDetailsRoutes';
import ContactDetailsRoutes from './routes/ContactDetailsRoutes'; 
import EducationalDetailsRoutes from './routes/EducationalDetailsRoutes'; 
import FoodSafetyQuestionnaireRoutes from './routes/FoodSafetyQuestionnaireRoutes';
import HealthAndDisabilityRoutes from './routes/HealthAndDisabilityRoutes';
import personalDetailsRoutes from './routes/personalDetailsRoutes';
import ProfessionalDetailsRoutes from './routes/ProfessionalDetailsRoutes';
import ReferenceRoutes from './routes/ReferenceRoutes';
import expressWinston from 'express-winston';
import logger from './utils/logger'; // Corrected path
import swaggerUI from 'swagger-ui-express';
import { swaggerSpec } from '../swagger';
// const Sentry = require("@sentry/node");

// Sentry.init({
// 	dsn: "https://34b0227e37c718d30bd3221515db17a7@o4507842016509952.ingest.de.sentry.io/4507842022801488",
//   tracesSampleRate: 1.0,
// });

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established successfully.');

    const app = express();
    const isLocal = process.env.NODE_ENV === 'development'; // Check if running in development mode

    const port = process.env.PORT || 8000;
    const url = isLocal ? process.env.LOCAL_URL : process.env.REMOTE_URL;

    // app.use(Sentry.Handlers.requestHandler()); // Sentry request handler first
    // app.use(Sentry.Handlers.tracingHandler());

    app.use(cors({
      origin: [
        'http://localhost:3000', // React
        'http://localhost:8080', // Vue
        'http://localhost:4200', // Angular
        'http://localhost:5173'  // Vite
      ]
    }));

    app.use(express.json());

    // Apply the rate limiter globally
    app.use(rateLimiter);

    // Request logging with Winston
    app.use(expressWinston.logger({
      winstonInstance: logger,
      meta: true, // Add meta data about the request
      msg: "HTTP {{req.method}} {{req.url}}", // Customize the logging message
      colorize: false,
      ignoreRoute: function (req, res) { return false; } // Ignore logging some routes
    }));

    // API routes with optional prefix
    const prefix = '/api';
    app.use(`${prefix}/users`, userRoutes);
    app.use(`${prefix}/auth/users`, userPrivateRoutes);
    app.use(`${prefix}/agreement-consent`, AgreementConsentRoutes); 
    app.use(`${prefix}/application`, ApplicationRoutes); 
    app.use(`${prefix}/bank-details`, BankDetailsRoutes); 
    app.use(`${prefix}/contact-details`, ContactDetailsRoutes); 
    app.use(`${prefix}/education-details`, EducationalDetailsRoutes);
    app.use(`${prefix}/food-safety`, FoodSafetyQuestionnaireRoutes);
    app.use(`${prefix}/health-and-disability`, HealthAndDisabilityRoutes);
    app.use(`${prefix}/personal-details`, personalDetailsRoutes);
    app.use(`${prefix}/professional-details`, ProfessionalDetailsRoutes);
    app.use(`${prefix}/reference`, ReferenceRoutes);
    
    // Swagger setup
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    // Error logging with Winston
    app.use(expressWinston.errorLogger({
      winstonInstance: logger
    }));

    // Sentry error handler
    // app.use(Sentry.Handlers.errorHandler());

    // Global error handler (optional)
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });

    app.listen(port, () => {
      console.log(`Server is running at ${url}`);
      console.log(`Swagger UI is available at ${url}/api-docs`);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
