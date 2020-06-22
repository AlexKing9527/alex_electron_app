let router = require(`koa-router`)();

router.get('/', ctx => {
  ctx.body = { "title": "front_page" };
})

router.get('/test/:id', async (ctx, next) => {
  let id = ctx.params.id
  console.log(id)
  await next()
})

module.exports = router.routes();