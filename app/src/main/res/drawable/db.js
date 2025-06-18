// db.js
import SQLite from 'react-native-sqlite-storage';

// Habilitar Promesas para usar async/await
SQLite.enablePromise(true);

// Instancia singleton para no abrir múltiples conexiones
let dbInstance = null;

/**
 * Obtiene o crea la conexión a la base de datos SQLite
 * @returns {Promise<SQLite.SQLiteDatabase>}
 */
export const getDBConnection = async () => {
  if (dbInstance) return dbInstance;

  try {
    dbInstance = await SQLite.openDatabase({
      name: 'miapp.db',
      location: 'default',
    });
    console.log('Base de datos abierta correctamente');
    return dbInstance;
  } catch (error) {
    console.log('Error al abrir la base de datos:', error);
    throw error;
  }
};

