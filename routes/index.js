const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');
const controllers = require('../controllers');

const isAdmin = async (ctx, next) => {
  if (ctx.session.isAdmin) {
    return next();
  }
  ctx.redirect('/login');
};

router.get('/', controllers.index);
router.get('/admin', isAdmin, controllers.admin);
router.get('/login', controllers.login);

router.post('/', koaBody(), controllers.sendMessage);
router.post(
  '/admin/upload',
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: process.cwd() + '/public/upload'
    }
  }),
  isAdmin,
  controllers.productAdd
);
router.post('/admin/skills', koaBody(), isAdmin, controllers.skillAdd);
router.post('/login', koaBody(), controllers.auth);

module.exports = router;
