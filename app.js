const Koa = require('koa');
const errorHandler = require('./libs/error');
const config = require('./config');
const flash = require('koa-better-flash');
const router = require('./routes');
const static = require('koa-static');
const session = require('koa-session');
const Pug = require('koa-pug');
const fs = require('fs');

const app = new Koa();
const pug = new Pug({
  viewPath: './views',
  pretty: false,
  basedir: './views',
  noCache: true,
  app: app
});

app.use(static('./public'));

app.use(errorHandler);

app.use(session(config.session, app));

app.use(flash());

app.use(router.routes()).use(router.allowedMethods());

app.on('error', (err, ctx) => {
  console.log(err);
  ctx.render('pages/error', {
    status: ctx.response.status,
    message: ctx.response.message
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  if (!fs.existsSync(config.upload)) {
    fs.mkdirSync(config.upload);
  }
  console.log(`Example app listening on port ${server.address().port}`);
});
