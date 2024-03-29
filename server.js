const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const proxy = require('http-proxy-middleware')
const convert = require('koa-connect')

const port = parseInt(process.env.PORT, 10) || 36666
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    router.get('/a', async ctx => {
        await app.render(ctx.req, ctx.res, '/a', ctx.query)
        ctx.respond = false
    })

    router.get('/b', async ctx => {
        await app.render(ctx.req, ctx.res, '/b', ctx.query)
        ctx.respond = false
    })

    router.get('*', async ctx => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })

    server.use(
        convert(
            proxy(
                '/api',
                {
                    logLevel: 'debug',
                    target: 'http://localhost:10086',
                    changeOrigin: true,
                    pathRewrite: { '^/api': '' }
                }
            )
        )
    )

    server.use(router.routes())
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
});
