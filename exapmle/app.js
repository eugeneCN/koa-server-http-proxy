const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const proxy = require('../index')

const app = new Koa()

app.use(static(path.join(__dirname, '/')))

const proxyTable = {
  '/json': {
    target: 'http://jsonplaceholder.typicode.com',
    pathRewrite: { '^/json': '' },
    changeOrigin: true
  },
  '/api': {
    target: 'https://news-at.zhihu.com',
    pathRewrite: { '^/api': 'api/4/' },
    changeOrigin: true
  }
}

Object.keys(proxyTable).forEach((context) => {
  var options = proxyTable[context]
  app.use(proxy(context, options))
})

// app.use(proxy('/api', {
//   target: 'https://news-at.zhihu.com',
//   pathRewrite: { '^/api': 'api/4/' },
//   changeOrigin: true
// }))

app.listen(3000, () => {
  console.log(`server is starting at port 3000`)
})
