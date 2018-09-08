const db = require('../models/db');

module.exports = async (ctx, next) => {
  const productList = db.getState().products || [];
  const skillList = db.getState().skills || [];
  const msgsemail = ctx.flash('msgsemail').join();
  ctx.render('pages/index', {
    products: productList,
    skills: skillList,
    msgsemail: msgsemail
  });
};
