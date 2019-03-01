// 产品表路由
const express = require('express');
const pool = require('../pool');
let router = express.Router();

module.exports = router;


// 分页获取产品信息
// 请求参数：
//   pageNum-需显示的页号；默认为1
//   type-可选，默认为1
// 输出结果：
//   {
//     totalRecord: 37,
//     pageSize: 6,
//     pageCount: 7,
//     pageNum: 1,
//     type: 1,
//     data: [{},{} ... {}]
//   }
router.get('/list/:pageNum/:type?',(req,res)=>{
    let pager = {
        pageNum:1,
        type:1,
        pageCount:7,
        pageSize:3,
        totalRecord:37,
        data:[]
    };
    pager.pageNum = req.params.pageNum;
    pager.type = isNAN(req.params.type)||req.params.type=="" ? 1 : req.params.type;

    pool.query("SELECT COUNT(*) AS count FROM mf_product WHERE type=?",[pager.type],(err,result)=>{
        if(err) throw err;
        pager.totalRecord = result[0].count;
        pager.pageCount = (pager.totalRecord/pager.pageSize)| 1;
        let start = (pager.pageNum-1)*pager.pageSize;

        pool.query("SELECT * FROM mf_product WHERE type=? ORDER BY pid DESC LIMIT ?,?",[pager.type,start,pager.pageSize],(err,result)=>{
            pager.data = result;
            res.json(pager);
        });
    });
});


// 根据产品ID返回产品详情
// 请求参数：
//   pid-产品ID，必需
// 输出结果：
//   {
//     "pid": 1,
//     "title1":"xxx",
//     ...
//   }
router.get('/detail/:pid',(req,res)=>{
    // 读取请求数据(路由参数parameters)
    let pid = req.params.pid;
    let sql = "SELECT * FROM mf_product WHERE pid=?";
    // 输出响应消息
    pool.query(sql,[pid],(err,result)=>{
        res.json(result);
    });
});
