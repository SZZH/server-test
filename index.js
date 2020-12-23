const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const header = {
  id: false,
  name: {
    title: '姓名',
    sorter: true,
    inputOptions: {
      type: 'Input',
      required: false,
      defaultValue: '',
      enums: [],
      placeholder: '请输入姓名',
      isSearch: true
    }
  },
  age: {
    title: '年龄',
    ilterMultiple: false,
    sorter: true,
    inputOptions: {
      type: 'InputNumber',
      required: true,
      defaultValue: null,
      placeholder: '请输入年龄',
      isSearch: true
    }
  },
  sex: {
    title: '性别',
    inputOptions: {
      type: 'Select',
      required: true,
      defaultValue: 1,
      placeholder: '请输入性别',
      isSearch: true,
      enums: {
        1: '男',
        0: '女'
      }
    }
  },
  date: {
    title: '时间',
    inputOptions: {
      type: 'DatePicker',
      required: true,
      defaultValue: '2001',
      isSearch: true,
    }
  },
  date2: {
    title: '两个时间',
    inputOptions: {
      type: 'RangePicker',
      required: true,
      defaultValue: ['2001', '2002'],
      isSearch: true,
    }
  }
}

let list = []

for (let i = 0; i < 10; i++) {
  list.push({
    key: i,
    id: {
      value: i,
      isShow: false,
    },
    name: {
      value: `test${i}`,
      isShow: true,
    },
    age: {
      value: Math.round((Math.random() + 1) * 100),
      isShow: true,
    },
    sex: {
      value: 1,
      isShow: true,
    },
    date: {
      value: '2020-01-01',
      isShow: true,
    },
    date2: {
      value: ['2020-01-01', '2020-01-20'],
      isShow: true,
    },
    children: [
      {
        key: i + '' + i,
        id: i,
        name: `test${i}children`,
        age: Math.round((Math.random() + 1) * 100),
        sex: 1,
        date: '2020-01-01',
        date2: ['2020-01-01', '2020-01-20'],
      }
    ]
  })
}

app.get('/api/testApi', (req, res) => {
  const result = 'sv'
  res.setHeader('Access-Control-Allow-Origin', '*')
  setTimeout(() => {
    res.send('123')
  }, 5000)
})

app.post('/api/getList', (req, res) => {
  const { current, pageSize, input = {}, sorter } = req.body
  const start = (current - 1) * pageSize
  let dataList = list.slice(start, start + pageSize)
  const searchKeys = Object.keys(input)
  if (searchKeys.length > 0) {
    dataList = dataList.filter(item => {
      for (let i = 0; i < searchKeys.length; i++) {
        if (input[searchKeys[i]] != item[searchKeys[i]].value) return false
      }
      return true
    }).sort((prev, next) => {
      console.log(sorter,)
      if(sorter.order === 'ascend') {
        console.log('‘进来了')
        return prev[sorter.field].value - next[sorter.field].value
      }else if(sorter.order === 'descend'){
        return next[sorter.field].value - prev[sorter.field].value
      }
    })
  }
  dataList.sort((prev, next) => {
    if(sorter.order === 'ascend') {
      console.log('‘进来了')
      return prev[sorter.field].value - next[sorter.field].value
    }else if(sorter.order === 'descend'){
      return next[sorter.field].value - prev[sorter.field].value
    }
  })
  let data = {
    list: dataList,
    header: header,
    pagination: {
      pageSize: pageSize || 20,
      total: searchKeys.length > 0 && dataList.length || list.length,
      showQuickJumper: true,
      showSizeChanger: true,
    }
  }

  res.setHeader('Access-Control-Allow-Origin', '*')

  res.send(data)
})

app.post('/api/insertItem', (req, res) => {
  const { input } = req.body
  list.unshift({
    id: {
      value: Date.now(),
      isShow: false,
      type: 'Input',
    },
    name: {
      value: input.name,
      isShow: true,
      type: 'Input',
    },
    age: {
      value: input.age,
      isShow: true,
      type: 'Input',
    },
    sex: {
      value: input.sex,
      enums: {
        0: '女',
        1: '男'
      },
      isShow: true,
      type: 'Input',
    },
    date: {
      value: input.date,
      isShow: true,
      type: 'Input',
    },
    date2: {
      value: input.date2,
      isShow: true,
      type: 'Input',
    }
  })


  res.send({
    status: 'success'
  })
})

app.post('/api/removeItem', (req, res) => {
  const { input: id } = req.body
  const firstLength = list.length
  for (let i in list) {
    if (list[i].id.value == id) {
      list.splice(i, 1)
    }
  }
  const endLength = list.length
  if (endLength === firstLength) {
    res.send({
      status: 'error'
    })
    return
  }

  res.send({
    status: 'success'
  })
})

app.post('/api/updateItem', (req, res) => {
  const { input } = req.body
  for (let i in list) {
    if (list[i].id.value == input.id) {
      const keys = Object.keys(input)
      // console.log(keys)
      keys.forEach(key => {
        list[i][key].value = input[key]
        console.log(list[i][key], input[key])
      })
      // console.log(list[i])
      break
    }
  }

  res.send({
    status: 'success'
  })
})

app.listen(3232, err => {
  if (err) return
  console.log('server is running in 3232')
})