export function fileNameHandler(name) {
  const path = `../assets/icons/${name}.svg`;
  const modules = import.meta.globEager("../assets/icons/*.svg");
  return modules[path].default;
}
