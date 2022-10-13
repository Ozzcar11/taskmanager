export function getStringStatus(status) {
   return ["error", "warning", "success"].find((item, index) => ++index == status)
}