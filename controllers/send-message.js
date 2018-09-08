const nodemailer = require('nodemailer');
const config = require('../config/index.json');
const validation = require('../libs/validation');

module.exports = async (ctx, next) => {
  console.log(ctx.request.body);
  const valres = validation.feedbackForm(ctx.request.body);

  if (valres.error) {
    ctx.flash('msgsemail', valres.message);
    return ctx.redirect('/');
  }

  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${ctx.request.body.name}" <${ctx.request.body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text:
      ctx.request.body.message.trim().slice(0, 500) + `\n Отправлено с: <${ctx.request.body.email}>`
  };
  await transporter.sendMail(mailOptions);

  ctx.flash('msgsemail', 'Письмо успешно отправлено!');
  ctx.redirect('/');
};
