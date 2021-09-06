import localStorage from 'react-native-sync-localstorage';
import { guidGenerator } from '../Utils/KeyGen';

exports.deleteTodo = async (i) => {
    try {
        const storedItems = JSON.parse(await localStorage.getItem('Tasks'));
        const itemsArray = storedItems || [];

        itemsArray.splice(i, 1)

        await localStorage.setItem(
            'Tasks',
            JSON.stringify([...itemsArray])
        ).catch((err) => {
            console.log(err);
        });
    }
    catch (err) {
        alert(err)
    }
}

exports.addTask = async (newEntry, newDate) => {
    let genId = guidGenerator();
    if (newEntry !== '') {
        const newTask = { id: genId, task: newEntry, completionDate: newDate, dateCreated: Date.now(), category: 'none', completed: false }

        try {
            const storedItems = JSON.parse(await localStorage.getItem('Tasks'));
            const itemsArray = storedItems || [];
            await localStorage.setItem(
                'Tasks',
                JSON.stringify([...itemsArray, newTask])
            ).catch((err) => {
                console.log(err);
            });
        }
        catch (err) {
            alert(err)
        }
    }
    else {
        alert('No task set')
    }
}

exports.addCategory = async (newEntry, color) => {
    let genId = guidGenerator();
    let c = 
    newEntry = newEntry.charAt(0).toUpperCase() + newEntry.slice(1)

    if (newEntry !== '') {
        const newCategory = { id: genId, category: newEntry, color: color}

        if(itemsArray.indexOf(newEntry) == -1){
            try {
                const storedItems = JSON.parse(await localStorage.getItem('Tasks'));
                const itemsArray = storedItems || [];
                await localStorage.setItem(
                    'Tasks',
                    JSON.stringify([...itemsArray, newCategory])
                ).catch((err) => {
                    console.log(err);
                });
            }
            catch (err) {
                alert(err)
            }
        }
        else{
            alert(newEntry, 'already exsists.')
        }
    }
    else {
        alert('No task set')
    }
}

exports.complete = async (i) => {
    try {
        const storedItems = JSON.parse(await localStorage.getItem('Tasks'));
        const itemsArray = storedItems || [];

        itemsArray[i].completed = true

        await localStorage.setItem(
            'Tasks',
            JSON.stringify([...itemsArray])
        ).catch((err) => {
            console.log(err);
        });
    }
    catch (err) {
        alert(err)
    }
}

exports.incomplete = async (i) => {

    try {
        const storedItems = JSON.parse(await localStorage.getItem('Tasks'));
        const itemsArray = storedItems || [];

        itemsArray[i].completed = false

        await localStorage.setItem(
            'Tasks',
            JSON.stringify([...itemsArray])
        ).catch((err) => {
            console.log(err);
        });
    }
    catch (err) {
        alert(err)
    }
}