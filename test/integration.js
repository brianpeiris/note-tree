import test from "ava";
import withPage from "./_withPage.js";

const url = "http://localhost:5000";

async function combo(keyboard, modifier, key) {
  await keyboard.down(modifier);
  await keyboard.press(key);
  await keyboard.up(modifier);
}

async function normalMode(keyboard) {
  await combo(keyboard, "Control", "[");
}

async function getInputValue(input) {
  return input.getProperty("value").then((h) => h.jsonValue())
}

test("enter insert mode and type", withPage, async (t, page) => {
  await page.goto(url);

  const input = await page.$("input");
  await input.type("itest");

  t.is(await getInputValue(input), "test");
});

test("add new items and indent", withPage, async (t, page) => {
  await page.goto(url);

  await page.keyboard.type("o");

  t.is((await page.$$("input")).length, 2);

  await normalMode(page.keyboard);

  await page.keyboard.type(">>");
  await page.keyboard.type(">>");
  await page.keyboard.type("o");

  t.is((await page.$$("input")).length, 3);
});

test("add new item without entering insert mode", withPage, async (t, page) => {
  await page.goto(url);

  await combo(page.keyboard, "Alt", "o");

  page.keyboard.type("i");

  const secondInput = (await page.$$("input"))[1];
  t.is(await getInputValue(secondInput), "");
});
