import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv';
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

// Import new search routes

import { swaggerSpec } from '../swagger';
import swaggerUI from 'swagger-ui-express'; // Import swaggerUI

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established successfully.');

    const app = express();
    const isLocal = process.env.NODE_ENV === 'development'; // Check if running in development mode

    const port = process.env.PORT || 8000;
    const url = isLocal ? process.env.LOCAL_URL : process.env.REMOTE_URL;

    app.use(cors({
      origin: [
        'http://localhost:3000', // React
        'http://localhost:8080', // Vue
        'http://localhost:4200', // Angular
        'http://localhost:5173'  // Vite
      ]
    }));

    app.use(express.json());

    // Swagger setup
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    // API routes
    const prefix = 'api';
    app.use(`/users`, userRoutes);
    app.use(`/auth/users`, userPrivateRoutes);
    app.use(`/agreement-consent`, AgreementConsentRoutes); 
    app.use(`/application`, ApplicationRoutes); 
    app.use(`/bank-details`, BankDetailsRoutes); 
    app.use(`/contact-details`, ContactDetailsRoutes); 
    app.use(`/education-details`, EducationalDetailsRoutes);
    app.use(`/food-safety`, FoodSafetyQuestionnaireRoutes);
    app.use(`/health-and-disability`, HealthAndDisabilityRoutes);
    app.use(`/personal-details`, personalDetailsRoutes);
    app.use(`/professional-details`, ProfessionalDetailsRoutes);
    app.use(`/reference`, ReferenceRoutes);
    

    app.listen(port, () => {
      console.log(`Server is running at ${url}`);
      console.log(`Swagger UI is available at ${url}/api-docs`);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });