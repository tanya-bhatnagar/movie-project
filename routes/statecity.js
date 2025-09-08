var express = require('express');
var router = express.Router();
var pool = require('./pool')
/* GET home page. */
router.get('/fetchallstates', function(req, res, next) {
 pool.query('select * from states',function(error,result){
    if(error)
    {
        res.status(500).json({data:[],status:false,error})
    }
    else
    {
        res.status(200).json({data:result,status:true})
    }
 })
});
router.get('/fetchallcity', function(req, res, next) {
    pool.query('select * from city where stateid=?',[req.query.stateid],function(error,result){
       if(error)
       {
           res.status(500).json({data:[],status:false,error})
       }
       else
       {
           res.status(200).json({data:result,status:true})
       }
    })
   });
   router.get('/fetchallcinema', function(req, res, next) {
    pool.query('select * from cinema where cityid=?',[req.query.cityid],function(error,result){
       if(error)
       {
           res.status(500).json({data:[],status:false,error})
       }
       else
       {
           res.status(200).json({data:result,status:true})
       }
    })
   });
   router.get('/fetchallscreen', function(req, res, next) {
    pool.query('select * from screens where cinemaid=?',[req.query.cinemaid],function(error,result){
       if(error)
       {
           res.status(500).json({data:[],status:false,error})
       }
       else
       {
           res.status(200).json({data:result,status:true})
       }
    })
   });
module.exports = router;
