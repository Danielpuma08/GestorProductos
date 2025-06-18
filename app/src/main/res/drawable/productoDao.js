// productoDao.js
import { getDBConnection } from './db';

export const crearTablaProducto = async () => {
  const db = await getDBConnection();
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        precio REAL
      );`
    );
  });
};

export const insertarProducto = async (nombre, precio, callback) => {
  const db = await getDBConnection();
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO productos (nombre, precio) VALUES (?, ?);',
      [nombre, precio],
      (_, resultado) => callback(true, resultado),
      (_, error) => {
        callback(false, error);
        return false;
      }
    );
  });
};

export const obtenerProductos = async callback => {
  const db = await getDBConnection();
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM productos;',
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => {
        console.log(error);
        return false;
      }
    );
  });
};

