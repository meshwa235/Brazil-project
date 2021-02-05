const puppeteer = require('puppeteer');
async function scrape(){
    url = 'https://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/pgdasd2018.app/declaracao/receitas';
    const browser = await puppeteer.launch();
    const pages = await browser.newPage();
    await pages.setExtraHTTPHeaders({
      'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
    });
    await pages.goto(url,{waitUntil:'domcontentloaded'});
    const data = await pages.evaluate(() => {
      try{
        var text = document.querySelector('body > div.wrapper > nav > div > div > a:nth-child(2) > span > font > font').innerText;
        var table = document.querySelector('body > div.wrapper > div > div:nth-child(1) > div > table:nth-child(1) > tbody > tr:nth-child(1) > th:nth-child(2) > font > font').innerText;
        return{ 
            text,
            table
          }
        }
          catch(err){
            console.log('end'); 
           }
      });
      console.log(data);
    
    
    await browser.close();
  }
  scrape();