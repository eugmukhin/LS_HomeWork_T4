module.exports = async (ctx, next) => {
  ctx.render('pages/admin', {
    msgskill: ctx.flash('msgskill').join(),
    msgfile: ctx.flash('msgfile').join()
  });
};
