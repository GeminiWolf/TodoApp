import AsyncStorage  from '@react-native-async-storage/async-storage';
import { guidGenerator } from '../Utils/KeyGen';

exports.deleteTodo = async (i) => {
    try {
        const storedItems = JSON.parse(await AsyncStorage.getItem('Tasks'));
        const itemsArray = storedItems || [];
        itemsArray.splice( i, 1)
        
        await AsyncStorage.setItem(
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

exports.addTask = async (title, description, newDate, endDate) => {
    let genId = guidGenerator();
    if (title !== '') {
        const newTask = { id: genId, title: title, description: description, startDate: newDate, endDate: endDate, dateCreated: Date.now(), category: 'none', completed: false }

        try {
            const storedItems = JSON.parse(await AsyncStorage.getItem('Tasks'));
            const itemsArray = storedItems || [];
            await AsyncStorage.setItem(
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

exports.addCategory = async (descrption, color) => {
    let genId = guidGenerator();
    let c = 
    descrption = descrption.charAt(0).toUpperCase() + descrption.slice(1)

    if (descrption !== '') {
        const newCategory = { id: genId, category: descrption, color: color}

        if(itemsArray.indexOf(descrption) == -1){
            try {
                const storedItems = JSON.parse(await AsyncStorage.getItem('Tasks'));
                const itemsArray = storedItems || [];
                await AsyncStorage.setItem(
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
            alert(descrption, 'already exsists.')
        }
    }
    else {
        alert('No task set')
    }
}

exports.complete = async (i) => {
    try {
        const storedItems = JSON.parse(await AsyncStorage.getItem('Tasks'));
        const itemsArray = storedItems || [];

        itemsArray[i].completed = true

        await AsyncStorage.setItem(
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
        const storedItems = JSON.parse(await AsyncStorage.getItem('Tasks'));
        const itemsArray = storedItems || [];

        itemsArray[i].completed = false

        await AsyncStorage.setItem(
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