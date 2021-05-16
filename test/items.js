import test from "ava";
import {link} from "../src/items.js";

test("link", t=> {
  const a = {};
  const b = {};
  const items = [a, b];
  const linked = link(items);
  t.is(a.arr, items);
  t.is(b.arr, items);
});

test("link nested", t=> {
  const a = {id:"a", children:[]};
  const b = {id:"b"};
  const c = {id:"c", children:[]};
  const d = {id:"d", children:[]};
  const e = {id:"e", children:[]};
  b.children = [c, d];

  const linked = link([a, b, e]);

  t.is(c.parent, b);
  t.is(d.parent, b);
  t.is(c.arr, b.children);
  t.is(d.arr, b.children);
});
