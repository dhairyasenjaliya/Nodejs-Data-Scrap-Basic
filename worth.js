var Request = require('request')
var cheerio = require('cheerio')
var async   = require('async')
var fs = require('fs'); 
var imdbUrl = 'https://www.celebritynetworth.com/richest-celebrities/actors/'
 
var actors = []

let rawdata = fs.readFileSync('height.json');  
let data = JSON.parse(rawdata).slice(521);  

async.eachOfSeries(data,function(item,i,callback){ 
  var celeb = imdbUrl + data[i].name.replace(/ /g , '-') + '-net-worth/' 
  Request(celeb ,function(error, response, body){ 
    var body = body 
    var $ = cheerio.load(body)
    var worth = ( $('#single__container').find('.value').text())  
    console.log(worth)
    actors.push({ name :data[i].name , worth , height : data[i].height }) 

    fs.writeFile('networt.json', JSON.stringify(actors), 'utf8', function(){
      console.log(celeb)
    });
    
    callback()
  })

},function(){
 
})
 


