let router = require(`koa-router`)();

router.get('/', ctx => {
  ctx.body = { "title": "front_page" };
})

router.get('/detail', ctx => {
  ctx.body = { "title": "detail_page" };
})

router.get('/test/:id', async (ctx, next) => {
  let id = ctx.params.id
  console.log(id)
  await next()
})

router.post('/login', async (ctx, next) => {
  let name = ctx.request.body.name || ''
  let psw = ctx.request.body.password || ''
  console.log(`name: ${name}, password: ${password}`);
})

module.exports = router.routes();