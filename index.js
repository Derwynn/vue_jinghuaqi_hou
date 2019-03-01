const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routerUser = require('./router/user');
const routerNews = require('./router/news');
const routerCart = require('./router/cart');
const routerProduct = require('./router/product');


let app = express();
http.createServer(app).listen(3000);

//使用第三方插件
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors({
    origin:['http://127.0.0.1',
    'http://localhost',
    'http://127.0.0.1:8080',
    'http://localhost:8080'],
    methods:['PUT','DELETE','GET','POST']
}));

// 路由器
app.use('/user',routerUser);
app.use('/news',routerNews);
app.use('/cart',routerCart);
app.use('/product',routerProduct);