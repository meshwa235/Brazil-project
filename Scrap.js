const puppeteer = require('puppeteer');
// Creating a function for extracting the data
async function run(){
    // Navigate to url
    let topUrl = 'https://www.imdb.com/title/tt1375666/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=8JXJYRDMX2BSY7MDGEHE&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_13';
    let browser = await puppeteer.launch({headless:false});
    let page = await browser.newPage();
    await page.goto(topUrl, {waitUntil: 'networkidle2'});
    // Getting specific data
    let data = await page.evaluate(() => {
        let title = document.querySelector('div[class="title_wrapper"]>h1').innerText;
        let year = document.querySelector('span[id="titleYear"]').innerText;
        let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;
        let rating = document.querySelector('div[class="ratingValue"]').innerText;
        // return the data
        return{
            title,
            year,
            ratingCount,
            rating
        }
    });
    // let's just get all links and create an array from the resulting NodeList
    const links = await page.evaluate(() => 
     Array.from(document.querySelectorAll("a")).map(anchor => [anchor.href, anchor.textContent])
    );
     // output all the links
    console.log(links);
    console.log(data);
    debugger;
    await browser.close();
};
run();