
# koa-server-http-proxy

A koa2 http-proxy-middleware.

## Installation

```bash
$ npm install koa-server-http-proxy --save
```

## Options

All options are passed to `http-proxy-middleware`, except that if options is passed
as a string, it will normalized as options' target.

See [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#options) for full list of
accepted options.


## Example

```js
const Koa = require('koa')

const app = new Koa()

const proxy = require('koa-server-http-proxy')

app.use(proxy('/api', {
  target: 'https://news-at.zhihu.com',
  pathRewrite: { '^/api': 'api/4/' },
  changeOrigin: true
}))


or ...

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

app.listen(3000)


```

## Browser

```
http://127.0.0.1:3000/api/themes
```

## License

MIT
