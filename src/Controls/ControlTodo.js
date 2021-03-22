export const add = () => {
    const AddNote = Object.extend('Notes')
    const addNote = new AddNote()

    addNote.set('user', User.current().id)
    addNote.set('title', title)
    addNote.set('note', note)

    addNote.save()
        .then(res => {
            fetchNotes()
            alert('Save')
        })
        .catch(err => {
            alert(err)
        })

    navigation.goBack()
}

export const update = () => {
    const AddNote = Object.extend('Notes')
    const addNote = new Query(AddNote)

    addNote.get(route.params.note.objectId)
        .then(obj => {
            obj.set('title', title)
            obj.set('note', note)
            obj.save()
                .then(res => {
                    fetchNotes()
                    alert('Updated!')
                })
                .catch(err => {
                    alert(err)
                })
        })
        .catch(err => {
            alert(err)
        })


    navigation.goBack()
}