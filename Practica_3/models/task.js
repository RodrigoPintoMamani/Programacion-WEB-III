let tasks = []; // Aquí guardaremos las tareas (puedes usar una base de datos real)

let nextId = 1;

module.exports = {
    getAll: () => tasks,
    getById: (id) => tasks.find(task => task.id === parseInt(id)),
    create: (title) => {
        const newTask = { id: nextId++, title };
        tasks.push(newTask);
    },
    delete: (id) => {
        tasks = tasks.filter(task => task.id !== parseInt(id));
    }
};
