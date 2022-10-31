export function getStringStatusRU(status) {
  return [
    'Устройство недоступно',
    'Задача создана',
    'Устройство доступно'
  ].find((item, index) => ++index == status)
}

export function getStringStatus(status) {
  return ['error', 'warning', 'success'].find(
    (item, index) => ++index == status
  )
}
