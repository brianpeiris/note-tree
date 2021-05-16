const puppeteer = require('puppeteer');
const pti = require('puppeteer-to-istanbul')

export default async (t, run) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
  await page.coverage.startJSCoverage()
	try {
		await run(t, page);
	} finally {
    pti.write(await page.coverage.stopJSCoverage())
		await page.close();
		await browser.close();
	}
}
