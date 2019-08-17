const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const puppeteer = require('puppeteer');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

const {Builder, By, Key, until} = require('selenium-webdriver');
 
async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    await driver.quit();
  }
}


// ESPN_USERNAME = 'taco'
// ESPN_PASSWORD = 'passwordistaco'
// ESPN_PLAYERS = 'http://games.espn.com/ffl/freeagency?leagueId=442780&teamId=7&seasonId=2018';


// async function log_in_espn() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://example.com');
//   await page.screenshot({path: 'example.png'});

//   await browser.close();
// };

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  example();
});


