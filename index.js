const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const header = {
  id: false,
  name: {
    title: '姓名',
    inputOptions: {
      type: 'Input',
      required: true,
      defaultValue: 'xxx'
    }
  },
  age: {
    title: '年龄',
    inputOptions: {
      type: 'Input',
      required: true,
      defaultValue: 'xxx'
    }
  },
  sex: {
    title: '性别',
    inputOptions: {
      type: 'Input',
      required: true,
      defaultValue: 'xxx'
    }
  }
}

let list = []

for(let i = 0; i < 100; i++) {
  list.push({
    id: {
      value: i,
      isShow: false,
      type: 'Input',
    },
    name: {
      value: `曾好${i}`,
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
  })
} 

app.get('/getList', (req, res) => {
  let data = {
    list,
    header: header,
    pagination: {
      pageSize: 20,
      total: list.length,
      showQuickJumper: true,
      showSizeChanger: true,
    }
  }

  res.setHeader('Access-Control-Allow-Origin', '*')

  res.send(data)
})

// app.get('/getTableHeader', (req, res) => {
//   res.send(header)
// })

app.post('/insertItem', (req, res) => {
  const body = req.body
  list.unshift(body)
  res.send('success')
})

app.post('/removeItem', (req, res) => {
  const { input: id } = req.body
  const firstLength = list.length
  console.log(id)
  for (let i in list) {
    if (list[i].id.value == id) {
      list.splice(i, 1)
    }
  }
  const endLength = list.length
  console.log(firstLength, endLength)
  if(endLength === firstLength) {
    res.send({
      status: 'error'
    })
    return
  }

  res.send({
    status: 'success'
  })
})

app.listen(3030, err => {
  if (err) return
  console.log('server is running in 3030')
})