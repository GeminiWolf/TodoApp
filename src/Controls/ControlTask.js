const deleteTodo = (i) => {
    const DeleteTask = Object.extend('Tasks')
    const deleteTask = new Query(DeleteTask)

    deleteTask.get(i)
        .then(obj => {
            obj.destroy()
                .then(res => {
                    alert('res')
                    fetchTasks()
                })
                .catch(err => {
                    alert(err)
                })
        })
}

const addTask = async (newEntry, newDate) => {
    const newTasks = Object.extend('Tasks')
    const task = new newTasks()

    task.set('user', User.current().id)
    task.set('task', newEntry)
    task.set('myne', newDate)

    try {
        let res = await task.save()
        alert('task created')
        fetchTasks()
    }
    catch (error) {
        alert('Failed to create new object, with error code: ' + error.message);
    }
    setVisible(false)
}

const complete = (i) => {
    const CompletedTask = Object.extend('Tasks')
    const completedTask = new Query(CompletedTask)

    completedTask.get(i)
        .then(obj => {
            obj.set('completed', true)
            obj.save()
                .then(res => {
                    fetchTasks()
                    alert('Task Completed!')
                })
                .catch(err => {
                    alert(err)
                })
        })
        .catch(err => {
            alert(err)
        })
}

const incomplete = (i) => {
    const IncompleteTask = Object.extend('Tasks')
    const incompleteTask = new Query(IncompleteTask)

    incompleteTask.get(i)
        .then(obj => {
            obj.set('completed', false)
            obj.save()
                .then(res => {
                    fetchTasks()
                    alert('Task Incompleted!')
                })
                .catch(err => {
                    alert(err)
                })
        })
        .catch(err => {
            alert(err)
        })
}