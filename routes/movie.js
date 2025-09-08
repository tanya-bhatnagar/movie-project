var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
router.get("/movie_interface", function (req, res, next) {
  try{
  var data=JSON.parse(localStorage.getItem("ADMIN"))
  if(data) 
  res.render("movieinterface", { message: "" });
  else
  res.render('logininterface', {message: '' });

  }
  catch(e)
  {
    res.render('logininterface', {message: '' });
  }
});

router.get("/display_by_id_interface", function (req, res, next) {
  try{
    var data=JSON.parse(localStorage.getItem("ADMIN"))
    if(data) 
      res.render("display_by_id", { message: "" });
    else
    res.render('logininterface', {message: '' });
  
    }
    catch(e)
    {
      res.render('logininterface', {message: '' });
    }

});
router.post(
  "/movie_submit",
  upload.single("poster"),
  function (req, res, next) {
    console.log("DATA:", req.body);
    console.log("Files:", req.file);
    pool.query(
      "insert into moviedata(moviename, stateid, cityid, cinemaid, screenid, status, description, movietime, releasedate, director, actor, actress, musicdirector, lyrics, poster) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.moviename,
        req.body.stateid,
        req.body.cityid,
        req.body.cinemaid,
        req.body.screenid,
        req.body.status,
        req.body.description,
        req.body.movietime,
        req.body.releasedate,
        req.body.director,
        req.body.actor,
        req.body.actress,
        req.body.musicdirector,
        req.body.lyrics,
        req.file.filename,
      ],
      function (error, result) {
        if (error) {
          res.render("movieinterface", {
            status: false,
            message: "Fail to Submit Record..",
          });
        } else {
          res.render("movieinterface", {
            status: true,
            message: "Record Submitted Successfully..",
          });
        }
      }
    );
  }
);

router.get("/display_all", function (req, res, next) {
  try{
    var data=JSON.parse(localStorage.getItem("ADMIN"))
    if(data) 
    {

  pool.query(
    "select M.*,(select C.cinemaname from cinema C where C.cinemaid=M.cinemaid) as cinemaname,(select S.screenname from screens S where S.screenid=M.screenid)as screenname,(select ST.statename from states ST where ST.stateid=M.stateid) as statename,(select CT.cityname from city CT where CT.cityid=M.cityid) as cityname  from moviedata M",
    function (error, result) {
      if (error) {
        res.render("displayall", { data: [] });
      } else {
        res.render("displayall", { data: result });
      }
    }
  );
}
else
{
  res.render('logininterface', {message: '' });

}
  }catch(e){
    res.render('logininterface', {message: '' });
  }
});

router.get("/display_by_id", function (req, res, next) {

  pool.query(
    "select M.*,(select C.cinemaname from cinema C where C.cinemaid=M.cinemaid) as cinemaname,(select S.screenname from screens S where S.screenid=M.screenid)as screenname,(select ST.statename from states ST where ST.stateid=M.stateid) as statename,(select CT.cityname from city CT where CT.cityid=M.cityid) as cityname  from moviedata M where M.movieid=?",
    [req.query.movieid],
    function (error, result) {
      if (error) {
        res.render("displaybyid", { data: [] });
      } else {
        if(result.length==1)
        res.render("displaybyid", { data: result[0],status:true });
        else
        res.render("displaybyid", { data:[],status:false });
      }
    }
  );
});

router.post("/movie_edit_delete", function (req, res, next) {
  if(req.body.btn=="Edit")
    {
    
  pool.query(
    "update moviedata set moviename=?, stateid=?, cityid=?, cinemaid=?, screenid=?, status=?, description=?, movietime=?, releasedate=?, director=?, actor=?, actress=?, musicdirector=?, lyrics=? where movieid=?",
    [
      req.body.moviename,
      req.body.stateid,
      req.body.cityid,
      req.body.cinemaid,
      req.body.screenid,
      req.body.status,
      req.body.description,
      req.body.movietime,
      req.body.releasedate,
      req.body.director,
      req.body.actor,
      req.body.actress,
      req.body.musicdirector,
      req.body.lyrics,
      req.body.movieid,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.redirect("/movie/display_all");
      } else {
        res.redirect("/movie/display_all");
      }
    })
  }
  else
{

  pool.query(
    "delete from moviedata  where movieid=?",
    [
      req.body.movieid,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.redirect("/movie/display_all");
      } else {
        res.redirect("/movie/display_all");
      }
    })


}



});
router.get("/edit_image", function (req, res, next) {

res.render("editimage",{data:req.query})

})


router.post("/edit_poster",upload.single("poster"), function (req, res, next) {
      
  pool.query(
    "update moviedata set poster=? where movieid=?",
    [
      req.file.filename,
      req.body.movieid],function (error, result) {
        if (error) {
          console.log(error);
          res.redirect("/movie/display_all");
        } else {
          res.redirect("/movie/display_all");
        }
      })
    })
      


module.exports = router;
