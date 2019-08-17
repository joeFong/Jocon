const puppeteer = require('puppeteer');
const {Builder, By, Key, until} = require('selenium-webdriver');

module.exports = class Jocon {

    constructor(user, password) {
        this.user = user;
        this.password = password;
    }

    async login() {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get('http://www.espn.com/login');

            // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);

            await driver.switchTo().frame(await driver.findElement(By.name('disneyid-iframe'))).then((el) => {
                console.log(el);
            });

            // await driver.findElement(By.css("input[type='email']")).sendKeys(this.user)
            // await driver.findElement(By.css("input[type='password']")).sendKeys(this.password)

            // await driver.findElement(By.css("btn-submit")).click();

            // await driver.switch_to.default_content();

            // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
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