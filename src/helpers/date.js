import moment from 'moment';
import 'moment/locale/pt-br';

export const format = (date, format) => {
    return moment(date).format(format);
}

export const date = (date, format) => {
    return format ? moment(date, format) : moment(date);
}

export const toDate = (time) => {
    return moment(new Date(time)).format("DD MMM. YYYY")
}