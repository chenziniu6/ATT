//引入Card.js,解构复制
const router = require('express').Router()
const path = require('path')
const {User} = require('../models/user')
const viewPath = path.join(__dirname,'../views')

//主页
router.get('/',(req,res)=>{
    if(req.session && req.session.user){
        const htmlPath = viewPath + '/game.html'
        res.sendfile(htmlPath);
    }else{
        res.redirect('/signin')
    }
});

//数据
router.get('/signin',(req,res)=>{
    const signinPath = viewPath + '/signin.html';
    res.sendFile(signinPath);
});

router.get('/signup',(req,res)=>{
    const signupPath = viewPath + '/signup.html';
    res.sendFile(signupPath);
});

router.get('/game',(req,res)=>{
    const gamePath = viewPath + '/game.html'
    res.sendFile(gamePath)
})

//注册名字的格式要求
const regName = /^[a-zA-Z]\w{3,}/

router.post('/main',(req,res)=>{
    if(req.session&&req.session.user){
        const { user } =req.session
        res.json({
            code:0,
            data:{
                cash:user.cash,
                roomtf:user.roomtf,
                roomid:user.roomid
            }
        })
    }else{
        res.redirect('/signup')
    }
})



router.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (!username){
        res.json({
            err: 1,
            msg: '请输入用账号!'
        })
        return
    }else
    if(!regName.test(username)){
        res.json({
            err: 1,
            msg: '用户名不规范!'
        })
        return
    }else
    if (!password){
        res.json({
            err: 1,
            msg: '请输入用密码!'
        })
        return
    }else
    if (!req.body.repassword){
        res.json({
            err: 1,
            msg: '请输入密码!'
        })
        return
    }else 
    if(req.body.repassword!=password){
        res.json({
            err: 1,
            msg: '两次输入密码不一致!'
        })
        return
    }
    User.find(username,(err,user)=>{
        if(err){
            console.error('find user failed:',err.message)
            res.json({
                err:1,
                msg:err.message
            })
            return
        }
        if(user){
            res.json({
                err:1,
                msg:'用户已存在!'
            })
            return
        }
    })

    User.create({username,password},err=>{
        if(err){
            res.json({
                err:1,
                msg:'创建用户失败'
            })
        }else{
            res.json({
                err:0,
                msg:'创建用户成功'
            })
        }
    })
}),


router.post('/signin', (req, res) => {
    const username = req.body.username
    User.find(username,(err,user)=>{
        if(err){
            console.error('find user failed:',err.message)
            res.json({
                err:1,
                msg:err.message
            })
            return
        }
        if(user){
            const password = req.body.password
            req.session.user = user
            const userData = req.session.user
            const us = new User
            us.id = userData.id
            us.name = userData.name
            us.pass_hash = userData.pass_hash
            us.pass_salt = userData.pass_salt
            us.cash = userData.cash
            us.gameStart = userData.gameStart
            us.gameCards = userData.gameCards
            
            if(!us.checkPassword(password)){
                res.json({
                    err:1,
                    msg:"密码错误"
                })
                return
            }
            us.gameStart = false
            us.gameCards = ''
            req.session.user = us

            res.json({
                err:0,
                msg:"登录成功!"
            })
        }else{
            res.json({
                err:1,
                msg:"用户错误"
            })
            return
        }
    })
});

module.exports = router
