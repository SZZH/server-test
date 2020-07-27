const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const header = {
  id: false,
  name: '姓名',
  age: '年龄',
  sex: '性别'
}

let list = [
  {
    id: {
      value: 1,
      isShow: false,
      type: 'Input',
    },
    name: {
      value: '曾好',
      isShow: true,
      type: 'Input',
    },
    age: {
      value: 20,
      isShow: true,
      type: 'Input',
    },
    sex: {
      value: 1,
      enums: {
        0: '女',
        1: '男'
      },
      isShow: true,
      type: 'Input',
    },
  },
  {
    id: {
      value: 2,
      isShow: false,
      type: 'Input',
    },
    name: {
      value: '曾好',
      isShow: true,
      type: 'Input',
    },
    age: {
      value: 20,
      isShow: true,
      type: 'Input',
    },
    sex: {
      value: 1,
      enums: {
        0: '女',
        1: '男'
      },
      isShow: true,
      type: 'Input',
    },
  },
  {
    id: {
      value: 3,
      isShow: false,
      type: 'Input',
    },
    name: {
      value: '曾好',
      isShow: true,
      type: 'Input',
    },
    age: {
      value: 20,
      isShow: true,
      type: 'Input',
    },
    sex: {
      value: 0,
      enums: {
        0: '女',
        1: '男'
      },
      isShow: true,
      type: 'Input',
    },
  },
]

app.get('/getList', (req, res) => {
  res.send(list)
})

app.get('/getTableHeader', (req, res) => {
  res.send(header)
})

app.post('/insertItem', (req, res) => {
  const body = req.body
  list.unshift(body)
  res.send('success')
})

app.post('/removeItem', (req, res) => {
  const { input: id } = req.body
  for (let i in list) {
    if (list[i].id.value === id) {
      list.splice(i, 1)
    }
  }

  res.send('success')
})

app.listen(3030, err => {
  if (err) return
  console.log('server is running in 3030')
})