import React, { createContext, useEffect, useState } from 'react';
import { User } from "parse/react-native.js";
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [Error, setError] = useState(null)
    const [tasks, setTasks] = useState(null)
    const [notes, setNotes] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingBtn, setLoadingBtn] = useState(false)

    useEffect(() => {
        // User?.currentAsync()
        //     .then((u) => {
        //         setUser(u)
        //         fetchTasks()
        //         fetchNotes()
        //     })
        //     .catch((er) => {
        //         setUser(null)
        //         alert(er)
        //     })

        loadItems()
    }, []);

    const loadItems = async () => {
        try {
            const getTasks = await AsyncStorage.getItem('Tasks')
            const parsedTasks = JSON.parse(getTasks)
            setTasks(parsedTasks || {})

            const getNotes = await AsyncStorage.getItem('Notes')
            const parsedNotes = JSON.parse(getNotes)
            setNotes(parsedNotes || {})

            setTimeout(() => {
                setLoading(true)
            }, 1000);
            console.log(notes);
            setLoading(false)
        }
        catch (err) {
            alert('Application Error. Cannot load data.')
            setTimeout(() => {
                setLoading(true)
            }, 1000);
            setLoading(false)
        }
    }

    const fetchTasks = async () => {
        await fetch('https://parseapi.back4app.com/classes/Tasks', {
            headers: {
                'X-Parse-Application-Id': 'wDsXtlHJ1rKibv1G5kx9y47oClXnrVsVxjnhA0w8',
                'X-Parse-REST-API-Key': 'OJQOK7dNzJgmEb3lqfFVrrsI2HRqCr6XtMSMoAO9',
                'content-type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then(({ results }) => {
                setTasks(results.filter(fil))
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchNotes = async () => {
        await fetch('https://parseapi.back4app.com/classes/Notes', {
            headers: {
                'X-Parse-Application-Id': 'wDsXtlHJ1rKibv1G5kx9y47oClXnrVsVxjnhA0w8',
                'X-Parse-REST-API-Key': 'OJQOK7dNzJgmEb3lqfFVrrsI2HRqCr6XtMSMoAO9',
                'content-type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then(({ results }) => {
                setNotes(results.filter(fil))
            })
            .catch((error) => {
                console.error(error);
            });
    };

    function fil(h) {
        if (User.current()?.id) {
            return h.user === User.current().id
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                Error,
                setError,
                tasks,
                notes,
                loading,
                setLoading,
                loadingBtn,
                loadItems,
                fetchTasks,
                fetchNotes,
                Login: () => {
                    setLoadingBtn(true)
                    User.currentAsync()
                        .then((res) => {
                            setUser(res)
                            fetchTasks()
                            fetchNotes()
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    setLoadingBtn(false)
                },
                logout: () => {
                    User.logOut()
                    User.currentAsync()
                        .then((res) => {
                            setUser(null)
                            setTasks(null)
                            setNotes(null)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
