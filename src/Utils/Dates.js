import moment from 'moment'

function getDate(d){    
    const date = d || new Date()
    return moment(date).format('dddd, D MMM YYYY')
}

const getWeek = (d) => {
    const date = d || new Date()
    return moment(date).week()
}

const getMonth = (d) => {
    const date = d || new Date()
    return moment(date).month()
}

const getYear = (d) => {
    const date = d || new Date()
    return moment(date).year()
}

const setDateFormat = (d) => {
    const date = d || new Date()
    return moment(date).format('dddd, D MMM YYYY')
}

const setTimeFormat = (d) => {
    const date = d || new Date()
    return moment(date).format('HH:mm')
}

export {getDate, getWeek, getMonth, getYear, setDateFormat, setTimeFormat, moment};