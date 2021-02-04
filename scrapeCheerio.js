const request = require('request');
const cheerio = require('cheerio');

request('https://www.digitaltrends.com/movies/best-movies-on-netflix/', (error, response, html)=>{
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);
        $('.post-content').each((i,val) => {
            const title = $(val).attr('h2');
            console.log(title);
        });
    }
});