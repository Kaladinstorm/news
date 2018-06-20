const Hits = require('../models/hits.models');
var request = require('request');


/** Validate if the post already exists */
var validateHit = function(objectID) {
    return new Promise(function(resolve, reject) { 
        Hits.findOne( { objectID: objectID }, function(err, data) {

            if(err) {
                throw err;
            } else {
                if(data) {
                    reject('Ya existe la historia!');
                } else {
                    resolve();
                }
            }
        });
    })
}

/** Add to the db the new post */
var addHits = function(hits) {

    validateHit(hits.objectID).then(function() {
        const newHit = Hits({
            created_at: hits.created_at,
            title: hits.title,
            url: hits.url,
            author: hits.author,
            story_id: hits.story_id,
            story_title: hits.story_title,
            story_url: hits.story_url,
            objectID: hits.objectID,
            isDeleted: hits.isDeleted
        });
        newHit.save(function(err, data) {
          if(err) {
            throw err;
          } else {
           // console.log(data);
           console.log('Data insertada!');
            return data;
          }
        })
    }).catch((err) => {
        console.log(err)
        return err ;
    })   
}

/** GET the entire data from the API */
module.exports.getApi = function(req, res) {
    request
  .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs', function(error, response, body) {
               
      if(error) {
        throw error;
      } else {
        var obj = JSON.parse(body)
  
        obj.hits.forEach((element) => {

          var hitsData = {
            created_at: element.created_at,
            title: element.title,
            url: element.url,
            author: element.author,
            story_id: element.story_id,
            story_title: element.story_title,
            story_url: element.story_url,
            objectID: element.objectID,
            isDeleted: false
          }
          //console.log(element.objectID)
          addHits(hitsData);
        });
        
        res.send({ message: 'Ingresado ok' });
        //
      }
  });
}

/** List the posts */
module.exports.listHits = function() {

    return new Promise(function(resolve, reject){

        Hits.find({ isDeleted: false }, function(err, data) {
            if(err) {
                reject(err);
            } else {
                
                resolve(data);
            }
        });
    });
        
        
}

/** Marks as deleted the selected post */
module.exports.markAsDeleted = function(req) {

    return new Promise(function(resolve, reject) {
        if(req.body.objectID) {
            Hits.findOne({ objectID: req.body.objectID }, function(err, data) {
    
                if(err) {
                    throw err;
                } else {
                    data.isDeleted = true;
    
                    data.save(function(err, data) {
                        if(err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        }
    });
    
}

