var express = require('express');
var router = express.Router();
var request = require('request');
const Hits = require('../models/hits.models');
const hitsController = require('../controllers/hits.controllers');
const prettydate = require("pretty-date");

//Me falta 
//Q al hacer click en una fila se abra la historia en una nueva tab
//Me falta agregarle los estilos a las palabras

/* GET home page. */
router.get('/', function(req, res, next) {

  res.redirect('/news');

});


// GET API ReignDesign

router.get('/getApi', function(req, res) {
  hitsController.getApi(req, res);
});

// Show news in homepage
router.get('/news', function(req, res) {
  hitsController.listHits().then(function(data) {
    
    data.forEach(function(element, index, array){
      
      array[index] = {
            created_at: prettydate.format(element.created_at),
            title: element.title,
            url: element.url,
            author: element.author,
            story_id: element.story_id,
            story_title: element.story_title,
            story_url: element.story_url,
            objectID: element.objectID,
            isDeleted: element.isDeleted
      }

    });

    res.render('index', { data });
  }).catch(function(error) {
    res.render('error', { error: error});
  });
});

//Mark as deleted the post
router.post('/news', function(req, res) {
  hitsController.markAsDeleted(req).then(function() {
    res.redirect('/news');
  }).catch(function(err){
    res.render('error', { error: error});
  });
});

module.exports = router;








/** Test things 
router.get('/test', function(req, res, next) {
  res.send(new Date().toISOString());
});*/

/** Test ingreso 
router.get('/news', function(req, res) {
    const newHit = Hits({
      hits: [{
        created_at: '2018-06-19T11:30:40.000Z',
        title: 'null',
        url: 'null',
        author: 'Brandon',
        story_id: 17338407,
        story_title: 'Cryptocurrencies: looking beyond the hype',
        story_url: 'https://www.bis.org/publ/arpdf/ar2018e5.htm'
      }],
      hitsPerPage: 20
    });
    newHit.save(function(err, data) {
      if(err) {
        throw err;
      } else {
        console.log(data);
        res.send(data);
      }
    })
});
*/
