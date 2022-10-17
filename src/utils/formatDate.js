import { dayjs } from "element-plus"

export function formatDate(date) {
  return dayjs.unix(date).format('D MMM YYYY HH:mm:ss')
}

export function formatResolvedDate(createDate, resolvedDate) {
   if (resolvedDate === null) {
      let res = dayjs(dayjs().diff(dayjs(createDate * 1000)) - 10800000)
      return `${res.format('D') - 1 ? res.format('D') - 1 + ' d. ' : ''} ${res.format('HH:mm:ss')}`
   }
   else { 
      let res = dayjs(dayjs(resolvedDate * 1000).diff(dayjs(createDate * 1000)) - 10800000)
      return `${res.format('D') - 1 ? res.format('D') - 1 + ' d. ' : ''} ${res.format('HH:mm:ss')}`
   }
}

export function formatTimeDate(date) {
   return dayjs.unix(date).format('HH:mm:ss')
}

export function formatDaysDate(date) {
   return dayjs.unix(date).format('YYYY:MM:DD')
}