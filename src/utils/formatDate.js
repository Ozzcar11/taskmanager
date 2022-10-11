import { dayjs } from "element-plus"

export function formatDate(date) {
  return dayjs.unix(date).format('D MMM YYYY HH:mm:ss')
}

export function formatResolvedDate(date) {
   if (date === null) return dayjs().format('D [d.] HH:mm:ss')
   return dayjs.unix(date).format('D [d.] HH:mm:ss')
}
