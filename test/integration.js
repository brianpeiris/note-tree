import test from "ava";
import withPage from "./_withPage.js";

const url = "http://localhost:5000";

test("enter insert mode and type", withPage, async (t, page) => {
  await page.goto(url);

  const input = await page.$("input");
  await input.type("itest");

  t.is(await input.getProperty("value").then((h) => h.jsonValue()), "test");
});

test("add new item", withPage, async (t, page) => {
  const errors = [];
  page.on("pageerror", e => errors.push(e));
  await page.goto(url);

  t.is((await page.$$("input")).length, 1)

  await page.keyboard.type("o");

  t.is((await page.$$("input")).length, 2)

  await page.keyboard.down("ControlLeft");
  await page.keyboard.press("[");
  await page.keyboard.up("ControlLeft");

  await page.keyboard.type(">>");
  await page.keyboard.type(">>");
  await page.keyboard.type("o");

  t.is(errors.length, 0)
  t.is((await page.$$("input")).length, 3)
});
