const mysql = require('mysql2/promise');

async function main() {
    try {
         // Crear la conexión usando promesas
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
             password: '',  // Asegúrate de que la contraseña sea la correcta
            database: 'testdb'
        });

        console.log('Conectado a la base de datos MySQL!');

         // Función para medir el tiempo de ejecución
        async function measureTime(func) {
            const start = performance.now();
             const result = await func();  // Ejecutar la función asíncrona
            const end = performance.now();
            console.log(`Tiempo de ejecución: ${(end - start).toFixed(2)} ms`);
            return result;
        }

         // Función que realiza la consulta
        async function queryDatabase() {
             const [rows] = await connection.execute('SELECT * FROM users');
            console.log('Resultados de la consulta:', rows);
             return rows;  // Devolver los resultados
        }

         // Ejecutar la consulta y medir el tiempo
        await measureTime(queryDatabase);

         // Cerrar la conexión
        await connection.end();
    } catch (err) {
        console.error('Error:', err);
    }
}

main();