const { Pool } = require('pg');

/*
Normalemente para crear una instancia de Pool, se le debe pasar un
objeto que contenga los datos para conectar con la base de datos,
pero el paquete "pg" se encarga de obtener esos datos directamente
de las variables de entorno especificadas en .env
 */
const pool = new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params)
};