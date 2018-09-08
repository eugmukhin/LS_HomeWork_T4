const password = require('../libs/password');

module.exports = async (ctx, next) => {
  ctx.session.isAdmin = password.authentication(ctx.request.body.email, ctx.request.body.password);

  if (ctx.session.isAdmin) {
    ctx.redirect('/admin');
  } else {
    ctx.flash('msgslogin', 'Пользователь с такой электронной почтой или паролем не найден');
    ctx.redirect('/login');
  }
};
