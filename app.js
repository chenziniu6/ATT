const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const session = require('express-session')
const cookie = require('cookie-parser')

const indexRouter = require('./routes/index')
const gameRouter = require('./routes/game')
app.use('/game',gameRouter);
require('./models/mysql')
//分配的端口
const port=3000;

app.use(express.static('Public'));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookie())
app.use(session({
    secret:'index game',
    resave:true,
    saveUninitialized:true
}))

app.use('/',indexRouter)
app.use('/game',gameRouter)


//indexes: []
function genCardGroup(randIdx){//有问题
    cards = new CardGroup();
    randIdx.forEach(id => {
        cards.push(id);//需要修改
    });
    return cards;
}

let gameCoin = 10000;
let gameCards;

app.get('/random',(req,res)=>{
    
    const randIdx=randomCards();//调用函数[0,12,2,14,5]
    gameCards = genCardGroup(randIdx);
    res.json({
        cards:randIdx,//=>{(type:1,vaule:1)}
        result:gameCards.judge(),
    });//返回客户端
});
app.listen(port,()=>{
    console.log('歪歪歪 第',port,'座山那边有人吗 ')
})