const Task = require('../models/task');

// Mostrar todas las tareas en la vista principal
exports.index = (req, res) => {
    // Aquí deberías obtener las tareas desde la base de datos o algún array
    const tasks = Task.getAll(); // Suponiendo que tienes un método para obtener todas las tareas
    res.render('index', { tasks });
};

// Crear una nueva tarea
exports.create = (req, res) => {
    const { title } = req.body;
    Task.create(title); // Crear una nueva tarea
    res.redirect('/'); // Redirigir a la página principal
};

// Editar una tarea
exports.edit = (req, res) => {
    const taskId = req.params.id;
    const task = Task.getById(taskId); // Obtener la tarea por su ID
    res.render('edit', { task });
};

// Eliminar una tarea
exports.delete = (req, res) => {
    const taskId = req.params.id;
    Task.delete(taskId); // Eliminar la tarea
    res.redirect('/'); // Redirigir a la página principal
};
