const mysql = require('mysql2');
const { performance } = require('perf_hooks');

 // Configuración común de la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
};

 // Función para medir el tiempo de ejecución
function measureTime(func) {
    const start = performance.now();
    func();
    const end = performance.now();
    console.log(`Tiempo de ejecución: ${(end - start).toFixed(2)} ms`);
}

 // Conexión Básica
function basicConnection() {
    const connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
            return;
        }
        console.log('Conectado a la base de datos MySQL!');
        
         connection.query('SELECT * FROM users', (err, results) => {
            if (err) {
                console.error('Error al realizar la consulta:', err);
                return;
            }
             console.log(results); // Muestra los resultados
        });

         connection.end(); // Cerrar la conexión
    });
}

 // Ejecutar la función y medir el tiempo de ejecución
console.log('Conexión básica:');
measureTime(basicConnection);