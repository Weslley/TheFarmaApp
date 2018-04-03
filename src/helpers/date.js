import moment from 'moment';

export const format = (date, format) => {
    return moment(date).format(format);
}

export const date = (date, format) => {
    return format ? moment(date, format) : moment(date);
}

export const toDate = (time) => {
    return moment(new Date(time)).format("DD MMM. YYYY")
}