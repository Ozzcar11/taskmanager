export function getStringRole(id) {
  return ["Администратор", "Пользователь"].find((item, index) => index == id);
}