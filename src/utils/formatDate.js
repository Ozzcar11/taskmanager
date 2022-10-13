import { dayjs } from "element-plus"

export function formatDate(date) {
  return dayjs.unix(date).format('D MMM YYYY HH:mm:ss')
}

export function formatResolvedDate(createDate, resolvedDate) {
   if (!resolvedDate) return dayjs(dayjs().diff(createDate)).format('D [d.] HH:mm:ss')
   return dayjs(dayjs.unix(resolvedDate).diff(dayjs.unix(createDate))).format('D [d.] HH:mm:ss')
}

export function formatTimeDate(date) {
   return dayjs.unix(date).format('HH:mm:ss')
}

export function formatDaysDate(date) {
   return dayjs.unix(date).format('YYYY:MM:DD')
}