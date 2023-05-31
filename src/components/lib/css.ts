export function pre(statename: string, classNames: string) {
  return classNames
    .split(' ')
    .map(cls => statename + cls)
}


export function after(str: string) {
  return str
    .split(' ')
    .map(cls => 'after:' + cls)
}