import moment from 'moment'

function getDate(d){
    
    const date = d || new Date()


    return moment(d).format('ddd, D MMM YYYY')
}

const getWeek = (d) => {
    const date = d || new Date()

    return moment(d).week()
}

const getMonth = (d) => {
    const date = d || new Date()

    return moment(d).month()
}

const getYear = (d) => {
    const date = d || new Date()

    return moment(d).year()
}

export {getDate, getWeek, getMonth, getYear};