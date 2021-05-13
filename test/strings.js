import test from "ava";
import {firstIndexOf, lastIndexOf} from "../src/strings.js";

test("firstIndexOf", t => {
  const str =  "foo    spam bxz";
  t.is(firstIndexOf(str, /\b/g, str.indexOf("p")), str.indexOf("b") - 1);
});

test("firstIndexOf last word", t => {
  const str =  "foo    spam bxz";
  t.is(firstIndexOf(str, /\s\b/g, str.indexOf("x")), null);
});

test("lastIndexOf", t => {
  const str =  "foo    spam bxz";
  t.is(lastIndexOf(str, /\b/g, str.indexOf("m")), str.indexOf("s"));
});
