import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/ru'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('ru')

dayjs.tz.setDefault('Atlantic/Canary')

export function formatDate(date) {
  return dayjs.unix(date).format('D MMM YYYY HH:mm:ss')
}

export function formatResolvedDate(createDate, resolvedDate) {
  const nowTime = dayjs().unix()
  if (createDate > nowTime) createDate = nowTime
  if (resolvedDate === null) {
    let res = dayjs(dayjs().diff(dayjs.unix(createDate))).tz()
    return formatWithoutFirstDay(res)
  } else {
    let res = dayjs(dayjs.unix(resolvedDate).diff(dayjs.unix(createDate))).tz()
    return formatWithoutFirstDay(res)
  }
}

export function formatTimeDate(date) {
  return dayjs.unix(date).format('HH:mm:ss')
}

export function formatDaysDate(date) {
  return dayjs.unix(date).format('YYYY:MM:DD')
}

function formatWithoutFirstDay(time) {
  return `${
    time.format('D') - 1 ? time.format('D') - 1 + ' д. ' : ''
  } ${time.format('HH:mm:ss')}`
}
