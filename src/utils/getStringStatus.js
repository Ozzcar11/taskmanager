export function getStringStatusRU(status) {
  return [
    'Устройство недоступно\nЗадача не создана',
    'Устройство недоступно\nЗадача создана',
    'Устройство доступно\nЗадача создана'
  ].find((item, index) => ++index == status)
}

export function getStringStatus(status) {
  return ['error', 'warning', 'success'].find(
    (item, index) => ++index == status
  )
}
