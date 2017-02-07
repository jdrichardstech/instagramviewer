var express = require('express')
var router = express.Router()
var superagent = require('superagent')



router.get('/',function(req, res, next){
  res.render('profilesearch', {title: 'hello'})
})


router.get('/:username',function(req, res, next){
      var username = req.params.username
      
      var url = 'https://www.instagram.com/' + username + '/media/'
      superagent
      .get(url)
      .query(null)
      .set('Accept', 'application/json')
      .end(function(err, response){
        if(err){
          res.json({
            confirmation: 'fail',
          })
          return
        }
          var userObject = response.body.items[0]
          var numposts = response.body.items.length
          var data={
            data: response.body.items,
            caption: userObject.user.profile_picture,
            username: userObject.caption.from.username,
            numposts: numposts,
            fullname: userObject.caption.from.full_name
          }
        res.render('profile', data)
      })
})

router.get('/:username/:id/', function(req, res, next){
  var username = req.params.username
  var id = req.params.id

  console.log(id)
  var url = 'https://api.instagram.com/oembed/?url=http://instagram.com/p/'+id
  superagent
  .get(url)
  .query(null)
  .set('Accept', 'application/json')
  .end(function(err, response){
    if(err){
      res.json({
        confirmation: 'fail',
      })
      return
    }
    // res.json(response.body)
    res.render('profileinfo',response.body)
  })
  // res.render()
  // res.json({
  //   confirmation:'success'
  // })
})



router.post('/', function(req, res, next){
  var username = req.body.username
  var url = '/profilesearch/' + username
  res.redirect(url)
})




module.exports = router
