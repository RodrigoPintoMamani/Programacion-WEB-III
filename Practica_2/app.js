const mysql = require('mysql2/promise');

 // Configuración de la base de datos
const config = {
    host: 'localhost',
    user: 'root',
    password: '', // Cambia por tu contraseña
    database: 'testdb'
};

 // 1. Conexión básica (sin promesas ni pooling) - Corregido para usar async/await
async function basicConnection() {
     const connection = await mysql.createConnection(config); // Usamos la versión de promesas

    console.log('Conectado a la base de datos MySQL (conexión básica)!');

     // Ejecutar la consulta
     const [results] = await connection.execute('SELECT * FROM users');
    console.log('Resultados de la consulta (Conexión básica):', results);

     await connection.end(); // Cerrar la conexión
}

 // 2. Conexión utilizando Promesas (mysql2/promise)
async function promiseConnection() {
    const connection = await mysql.createConnection(config);
    console.log('Conectado a MySQL usando promesas');
    
     // Ejecutar la consulta y obtener los resultados
     const [rows] = await connection.execute('SELECT * FROM users');
    
     // Mostrar los resultados
    console.log('Resultados de la consulta (Promesas):', rows);
    
    await connection.end();
}

 // 3. Conexión utilizando Pooling (mysql2/promise)
async function poolingConnection() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '', // Cambia por tu contraseña
        database: 'testdb',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

     const [rows] = await pool.query('SELECT * FROM users');
    console.log('Resultados de la consulta (Pooling):', rows);

     // Cerramos el pool después de las consultas
    await pool.end();
}

 // Función para medir el tiempo de ejecución
async function measureTime(func) {
    const start = performance.now();
     await func(); // Esperamos que la función termine antes de medir el tiempo
    const end = performance.now();
    console.log(`Tiempo de ejecución: ${(end - start).toFixed(2)} ms`);
}

async function run() {
    console.log('Ejecutando la conexión básica:');
     await measureTime(basicConnection);  // Aquí usamos la función de conexión básica

    console.log('Ejecutando la conexión utilizando promesas:');
     await measureTime(promiseConnection); // Aquí usamos la función de promesas

    console.log('Ejecutando la conexión utilizando pooling:');
     await measureTime(poolingConnection); // Aquí usamos la función de conexión pooling
}

run();