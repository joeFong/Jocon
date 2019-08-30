const puppeteer = require('puppeteer');
const {Builder, By, Key, until} = require('selenium-webdriver');

class Jocon {

    constructor(user, password) {
        this.user = user;
        this.password = password;
    }

    async login() {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('http://www.espn.com/login');
            await driver.wait(until.elementLocated(By.id('disneyid-iframe')), 10000);
            await driver.switchTo().frame(driver.findElement(By.id('disneyid-iframe'))).then(() => {
                driver.findElement(By.css("input[type='email']")).sendKeys(this.user);
                driver.findElement(By.css("input[type='password']")).sendKeys(this.password);
                driver.findElement(By.css(".btn-submit")).click();
                driver.wait(until.elementLocated(By.css('.link-text')), 10000).then(() => {
                    driver.get('https://www.espn.com/fantasy/basketball/');
                });
            });
        } finally {
            // await driver.quit();
        }
    }


    async log_in_headless() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://example.com');
        await page.screenshot({path: 'example.png'});

        await browser.close();
    };
}


module.exports = Jocon;