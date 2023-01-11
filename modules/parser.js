
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

async function lineSaver(line, output) {
  try {
      fs.appendFile(output, line + '\n', (err) => {
          if (err) {
              console.error(err)
          }
          // console.log(line)
      })
  } catch (error) {
      throw error
  }

}


module.exports = async function startParser(searchRequest) {
 
  console.log('start')
  let resultObj={};
  let output = './currentBrand.json';
  let searchDiv="div.search-catalog__block";
  let brandsName="ul.filter__list>li>div>span.checkbox-with-text__text";
  let showBrands="button.filter__show-all";
  let brandF= `button[class="dropdown-filter__btn"]`;
  let content;

  fs.unlink(output, function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Файл удалён");
    }
});

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        //headless: false
    });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080
})

  await page.goto('https://www.wildberries.ru/');


  await page.waitForTimeout(3000)
  
 
  await page.hover(searchDiv);
  await page.click(searchDiv);
  await page.type(searchDiv,searchRequest,{delay:30})
  await page.keyboard.press('Enter')
 

  await page.waitForTimeout(3000)



 const brandElement = await page.$$(brandF);
 console.log(brandElement)
 await brandElement[1].click()

  
  await page.waitForTimeout(3000)
try{
  await page.hover(showBrands); // не обязательный параметр
  await page.click(showBrands);
}catch{}
  await page.waitForTimeout(3000)
  content = await page.content()
  $ = await cheerio.load(content); 

 
  await $(brandsName).each(function(index, elem){
   let temp = $(elem).text().replace(/\d*$/g, '').trim();
    resultObj[index]=temp

  })

  lineSaver(JSON.stringify(resultObj),output)
  //console.log(massivBrandsName)

  await browser.close();
  
}

