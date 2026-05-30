const jwt = require('jsonwebtoken');

const usuarios = [];

const register = async (req, res) => {

  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {

    return res.status(400).json({
      error: 'Todos los campos son obligatorios'
    });

  }

  const usuario = {
    id: usuarios.length + 1,
    nombre,
    email
  };

  usuarios.push({
    ...usuario,
    password
  });

  res.status(201).json({
    ok: true,
    usuario
  });

};

const login = async (req, res) => {

  const { usuario, password } = req.body;

  if (
    usuario !== 'admin' ||
    password !== '123456'
  ) {

    return res.status(401).json({
      error: 'Credenciales incorrectas'
    });

  }

  const token = jwt.sign(
    { usuario },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );

  res.json({
    ok: true,
    token
  });

};

module.exports = {
  register,
  login
};