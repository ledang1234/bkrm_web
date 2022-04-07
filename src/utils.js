import moment from 'moment';

export const convertDateToString = (date) => {
    return moment.unix(date.getTime() / 1000).format('YYYY-MM-DD HH:mm:ss',  { trim: false })
}

