module.exports = async (ctx, next) => {
  if (ctx.session.isAdmin) {
    ctx.redirect('/admin');
  } else {
    const msgslogin = ctx.flash('msgslogin').join();
    ctx.render('pages/login', { msgslogin: msgslogin });
  }
};
