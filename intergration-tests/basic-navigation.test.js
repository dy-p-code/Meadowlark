// 통합테스트 작동 순서
// 1. 자유로운 포트에서 애플리케이션 서버를 시작한다.
// 2. 헤드리스 크롬 브라우저에서 페이지를 오픈한다.
// 3. 애플리케이션 홈페이지로 이동한다.
// 4. data-test-id가 "about"인 링크를 찾아 클릭한다.
// 5. 링크로 이동할 때까지 기다린다.
// 6. /about 페이지에 도착했는지 확인한다.

const portfinder = require('portfinder');
const puppeteer = require('puppeteer');

const app = require('../app.js');

let server = null;
let port = null;

beforeEach(async () => {
  port = await portfinder.getPortPromise();
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

test('home page links to about page', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}`);
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-test-id="about"]'),
  ]);
  expect(page, url()).toBe(`http://localhost:${port}/about`);
  await browser.close();
});
