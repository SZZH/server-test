const obj = {
  name: 'zh',
  age: 20,
  sex: 1
}

const { name, ...rest } = obj
console.log(rest)