const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors');


const index = require('./routes/index')
const users = require('./routes/users')
const swipe = require('./routes/swipe')
const notice = require('./routes/notice')
const grid = require('./routes/grid')
const grid2 = require('./routes/grid2')
const tab = require('./routes/tab')
const tabTwo = require('./routes/tabTwo')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/login') {
      return "*"; // 允许来自所有域名请求
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(swipe.routes(), swipe.allowedMethods())
app.use(notice.routes(), notice.allowedMethods())
app.use(grid.routes(), grid.allowedMethods())
app.use(grid2.routes(), grid2.allowedMethods())
app.use(tab.routes(), tab.allowedMethods())
app.use(tabTwo.routes(), tabTwo.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
