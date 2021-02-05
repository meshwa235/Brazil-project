const puppeteer = require('puppeteer');
async function scrape(){
    url = 'http://www8.receita.fazenda.gov.br/simplesnacional/servicos/grupo.aspx?grp=5';
    const browser = await puppeteer.launch();
    const pages = await browser.newPage();
    await pages.setExtraHTTPHeaders({
      'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
    });
    await pages.goto(url,{waitUntil:'networkidle0'});
    const data = await pages.evaluate(() => {
      try{
        var text = document.querySelector('span[id="ctl00_ContentPlaceHolder_menuServicos_lblGrupo"]').innerText;
        return{ 
            text
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