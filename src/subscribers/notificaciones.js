const { sub } = require('../redis/client');

const iniciarSuscripciones = (io) => {

  sub.psubscribe('study:*', (err, count) => {

    if (err) {
      console.log(err.message);
      return;
    }

    console.log('Escuchando Redis...');
  });

  sub.on('pmessage', (pattern, channel, message) => {

    try {

      const evento = JSON.parse(message);

      console.log('Evento recibido');

      io.emit('nuevo-evento', {
        canal: channel,
        ...evento
      });

    } catch (error) {

      console.log(error.message);

    }

  });

};

module.exports = { iniciarSuscripciones };