const router = require('koa-router')()
const tabTwo = require('../models/tabTwo');
const upload = require('../util/upload')

router.prefix('/tabTwo')


router.get('/', async ctx => {
    ctx.body = {  //这是向前台返回的数据 因为没有连接数据库所以我们自己定义，后面讲连接数据库
        status: "200",
        title: "tabTwo接口",
    };

});
router.post('/upload', upload.single('file'), async (ctx, next) => {
    const {
        filename,
    } = ctx.req.file
    const url = `http://localhost:3000/public/images/${filename}`
    console.log(ctx.req.file);
    ctx.body = {
        url
    }
})

router.get('/list', async (ctx) => {
    let items = await tabTwo.find()
    let total = parseInt(items.length)
    console.log(items.length);
    ctx.body = {
        code: '200',
        data: {
            total,
            items
        }
    }
});

router.post('/addList', async (ctx) => {
    let req = ctx.request.body
    console.log(req);
    const good = new tabTwo(req);

    let data = await good.save()
    console.log(`/addList:${data}`);
    ctx.body = {
        code: '200',
        msg: '',
        data
    }
});
// 5ea9527467b5b9362cb1e14a
router.post('/deleteList', async (ctx) => {

    let req = ctx.request.body
    let data = await tabTwo.deleteOne(req)
    console.log(`/deleteList:${data}`);
    console.log(req);
    ctx.body = {
        status: '200',
        msg: '',
        data
    }
});
router.post('/updateList', async (ctx) => {

    let req = ctx.request.body
    let { _id } = ctx.request.body
    console.log(_id);
    console.log(req);
    let data = await tabTwo.updateOne({ _id: _id }, { $set: req })
    // console.log(req);
    ctx.body = {
        status: '200',
        msg: '',
        data
    }
})

module.exports = router