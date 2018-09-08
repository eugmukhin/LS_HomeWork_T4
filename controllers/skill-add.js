const db = require('../models/db');
const validation = require('../libs/validation');

module.exports = async (ctx, next) => {
  const valres = validation.skillForm(ctx.request.body);
  if (valres.error) {
    ctx.flash('msgskill', valres.message);
  } else {
    for (let key in ctx.request.body) {
      db.get('skills')
        .find({ id: key })
        .assign({ number: ctx.request.body[key] })
        .write();
    }
    ctx.flash('msgskill', 'Данные успешно измененны.');
  }
  ctx.redirect('/admin');
};
