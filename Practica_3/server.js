// Requerimos las dependencias necesarias
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Creamos una instancia de Express
const app = express();

// Configuración de la vista (motor de plantillas EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (como CSS y JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para procesar el cuerpo de las solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));

// Importar las rutas de los controladores
const taskController = require('./controllers/taskController');

// Rutas
app.get('/', taskController.index); // Mostrar la lista de tareas
app.post('/tasks', taskController.create); // Crear una nueva tarea
app.get('/tasks/:id/edit', taskController.edit); // Editar tarea
app.post('/tasks/:id/delete', taskController.delete); // Eliminar tarea

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
