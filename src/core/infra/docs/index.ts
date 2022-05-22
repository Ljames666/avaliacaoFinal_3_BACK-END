import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.json';

export const setSwaggerUi = (app: express.Application) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
