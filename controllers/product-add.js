const fs = require('fs');
const util = require('util');
const unlink = util.promisify(fs.unlink);
const validation = require('../libs/validation');
const path = require('path');
const db = require('../models/db');

module.exports = async (ctx, next) => {
  const files = ctx.request.files;
  const fields = ctx.request.body;
  const valres = validation.productForm(fields, files);
  let response = '';

  if (valres.error) {
    response = valres.message;
    await unlink(files.photo.path);
  } else {
    db.get('products')
      .push({
        src: path.join('upload', path.basename(files.photo.path)),
        name: fields.name,
        price: fields.price
      })
      .write();
    response = 'Продукт успешно добавлен.';
  }

  ctx.flash('msgfile', response);
  ctx.redirect('/admin');
};
