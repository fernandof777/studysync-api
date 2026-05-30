// src/server.js 
  // Punto de entrada principal — inicia el servidor HTTP 
 /*equire('dotenv').config(); 
  const app = require('./app'); 
   
  const PORT = process.env.PORT || 3000; 
   
  app.listen(PORT, () => { 
    console.log('═══════════════════════════════════════════'); 
    console.log(`  StudySync API · http://localhost:${PORT}`); 
    console.log(`  Modo: ${process.env.NODE_ENV || 'development'}`); 
    console.log('═══════════════════════════════════════════'); 
  }); 
  */
 require('dotenv').config();

const http = require('http');

const { Server } = require('socket.io');

const app = require('./app');

const servidor = http.createServer(app);

const io = new Server(servidor, {
  cors: {
    origin: '*'
  }
});

const { iniciarSuscripciones } = require('./subscribers/notificaciones');

iniciarSuscripciones(io);

io.on('connection', (socket) => {

  console.log('Cliente conectado');

  socket.on('disconnect', () => {

    console.log('Cliente desconectado');

  });

});

const PORT = process.env.PORT || 3000;

servidor.listen(PORT, () => {

  console.log(`Servidor en puerto ${PORT}`);

});