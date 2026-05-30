// src/swagger/config.js

const swaggerJsdoc = require('swagger-jsdoc');

const opciones = {

  definition: {

    openapi: '3.0.0',

    info: {

      title: 'StudySync API',

      version: '1.0.0',

      description: 'API para coordinación de grupos de estudio con notificaciones en tiempo real',

      contact: {

        name: 'M.Sc. Jimmy Nataniel Requena Llorentty',

        email: 'docente@upds.edu'

      }

    },

    servers: [

      {

        url: 'http://localhost:3000',

        description: 'Desarrollo local'

      },

      {

        url: 'https://studysync-api.onrender.com',

        description: 'Producción'

      }

    ],

    components: {

      securitySchemes: {

        BearerAuth: {

          type: 'http',

          scheme: 'bearer',

          bearerFormat: 'JWT'

        }

      }

    }

  },

  apis: ['./src/routes/*.js']

};

module.exports = swaggerJsdoc(opciones);