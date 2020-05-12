const router = require('koa-router')()
const Notice = require('../models/notice');
const upload = require('../util/upload')

router.prefix('/notice')


router.get('/', async ctx => {
    // let r =await adminUser.create({
    //     username: "root", 
    //     password: "123456"
    // })
    ctx.body = {  //这是向前台返回的数据 因为没有连接数据库所以我们自己定义，后面讲连接数据库
        status: "200",
        title: "Notice接口",
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
    let items = await Notice.find()
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
    const good = new Notice(req);

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
    let data = await Notice.deleteOne(req)
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
    let data = await Notice.updateOne({ _id: _id }, { $set: req })
    // console.log(req);
    ctx.body = {
        status: '200',
        msg: '',
        data
    }
})

module.exports = router