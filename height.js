var Request = require('request')
var cheerio = require('cheerio') 
var fs = require('fs'); 
var async   = require('async')  
var heights=[]

let rawdata = fs.readFileSync('actor.json');  
let data = JSON.parse(rawdata) 


async.eachOfSeries(data,function(item,i,callback){    
  Request(item.link  ,function(error, response, body){  
    
    var body = body
    var $ = cheerio.load(body)
    var name = data[i].name
    var height = $('#details-height').text().trim().replace('Height:\n','').replace('\"','')
    heights.push({ name ,  height  })
    request = require('request'); 

    fs.writeFile('height.json', JSON.stringify(heights), 'utf8', function(){
      console.log('Doneee')
    });  
    callback() 
})    

},function(){  
  
})
 