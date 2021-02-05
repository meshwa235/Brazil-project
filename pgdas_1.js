const puppeteer = require('puppeteer');
const fs = require('fs');
async function scrape(){
    url = 'http://www8.receita.fazenda.gov.br/simplesnacional/Default.aspx';
    const browser = await puppeteer.launch();
    const pages = await browser.newPage();
    await pages.setExtraHTTPHeaders({
      'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
    });
    await pages.goto(url,{waitUntil:'networkidle0'});
    const data = await pages.evaluate(() => {
        var news = document.querySelector('div[id = "noticias"]>h1').innerText;
        var menu = document.querySelector('div[id = "menuDireita"]').innerText.trim();
        return{ 
          news,
          menu
        }
    });
    fs.writeFile("./pgdas.json", JSON.stringify(data,null,3),  (err) => {
      if (err) {
          console.error(err);
          return;
      };
      console.log("Done");
    });
  await browser.close();
}
scrape();