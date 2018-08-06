'use strict'

const koaConnect = require('koa2-connect')
const httpProxy = require('http-proxy-middleware')

module.exports = function(context, options) {
  var proxy

  if (typeof options == 'string') {
    options = { target: options }
  }

  proxy = httpProxy(context, options)

  return async function(ctx, next) {
    await koaConnect(proxy)(ctx, next)
  }
}

