const mysql = require('mysql2');

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb',
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexiones
    queueLimit: 0 // Sin límite de cola
});

// Función para medir el tiempo de ejecución
async function measureTime(func) {
    const start = performance.now();
    await func(); // Usamos await para asegurarnos de que la función asíncrona termine antes de medir el tiempo
    const end = performance.now();
    console.log(`Tiempo de ejecución: ${(end - start).toFixed(2)} ms`);
}

// Función para realizar la consulta usando el pool
async function queryDatabase() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users', (err, results) => {
            if (err) return reject(err);
            console.log(results);
            resolve(results);
        });
    });
}

// Ejecutar la medición de tiempo con la consulta
async function run() {
    try {
        console.log("Ejecutando consulta con pool de conexiones:");
        await measureTime(queryDatabase);
    } catch (err) {
        console.error('Error en la consulta:', err);
    } finally {
        // Cerrar el pool de conexiones después de ejecutar la consulta
        pool.end(() => {
            console.log("El pool de conexiones se ha cerrado.");
        });
    }
}

run();
