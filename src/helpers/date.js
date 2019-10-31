import moment from 'moment';

export function parse_date(date){
	return moment(date).format('DD/M/YYYY');
}
