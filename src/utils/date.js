export function getFormatDate(utc) {
	const date = new Date(utc)
	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()
	function pd(unit) {
		return unit > 9 ? unit : '0'+unit 
	}
	return `${year}-${pd(month)}-${pd(day)} ${pd(hour)}:${pd(minute)}`
}