var Request = require('request')
var cheerio = require('cheerio') 
var fs = require('fs'); 
var async   = require('async') 


let rawdata = fs.readFileSync('actor.json');  
let data = JSON.parse(rawdata);  
var imdbUrl = 'https://en.wikipedia.org/wiki/'  


async.eachOfSeries(data,function(item,i,callback){  
  Request(imdbUrl + item.name  ,function(error, response, body){
  
    var body = body
    var $ = cheerio.load(body)
    
    request = require('request');
    
    var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){  
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };
   
  var path =  'https:' +  $('.image').children('img').attr('src')  
  if(path != 'https:undefined' )
  {
    download( path , 'images/'+ item.name.replace(/ /g,'_') +'.png', function(){
      console.log('done');
    });  
  }

  callback()

})  
},function(){
     
})
 
  
   
