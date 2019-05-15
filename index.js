var Request = require('request')
var cheerio = require('cheerio')
var async   = require('async')
var fs = require('fs'); 
var imdbUrl = 'https://www.imdb.com/list/ls058011111/?sort=list_order,asc&mode=detail&page='
var data = [1,2,3,4,5,6,7,8,9,10]
var actors = []
async.eachOfSeries(data,function(item,i,callback){

  Request(imdbUrl+item,function(error, response, body){
    var body = body
    var $ = cheerio.load(body)
    
    $('#main .lister-list > .lister-item').map(function(){
      var actor = ($(this).find('.lister-item-header a').text()).replace(/(\r\n|\n|\r)/gm,"")
      var url = 'https://www.imdb.com' + ($(this).find('.lister-item-header a').attr('href')) 
      actor = actor.trimStart()
 
      actors.push({name:actor , link:url }) 
    }) 
    callback()
  })

},function(){
  fs.writeFile('actor.json', JSON.stringify(actors), 'utf8', function(){
    console.log('yey')
  });
})
 


