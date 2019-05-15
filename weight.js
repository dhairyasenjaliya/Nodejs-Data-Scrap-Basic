var Request = require('request')
var cheerio = require('cheerio') 
var fs = require('fs'); 
var async   = require('async')  
var heights=[]

// var imdbUrl = 'https://starsunfolded.com/'

var imdbUrl = 'https://healthyceleb.com/robert-de-niro-height-weight-body-statistics'

let rawdata = fs.readFileSync('networt.json');  
let data = JSON.parse(rawdata) 


async.eachOfSeries(data,function(item,i,callback){    
  Request( imdbUrl+data[i].name.replace(/ /g,'- ').replace(/ /g,'')  +'/',function(error, response, body){  
    
    var body = body
    var $ = cheerio.load(body)
    var name = data[i].name 
    var height = data[i].height
    var networth = data[i].worth

    var weight = $('#single1').children('.column-2').text().replace(/  /g,' ').replace(/-/g,'').replace(' in Kilograms','').replace('\nin Pounds','').replace('in Kilograms','')
    
    console.log( $('.td-post-content').find('strong').text() )

    var image =  'http://celeb.apitestdomain.xyz/images/celebrities/' + data[i].name.replace(/ /g,'_') +'.png'
      
    heights.push({ name , image, height , weight , networth  })
    request = require('request'); 

    fs.writeFile('final.json', JSON.stringify(heights), 'utf8', function(){
        // console.log(name + ' ' + weight)
    });  
    // callback() 
})    

},function(){  
  
})
 