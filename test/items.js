import test from "ava";
import {link} from "../src/items.js";

test("link", t=> {
  const a = {};
  const b = {};
  const linked = link([a, b]);
  t.is(a.next, b);
  t.is(b.prev, a);
});

test("link nested", t=> {
  const a = {id:"a", children:[]};
  const b = {id:"b"};
  const c = {id:"c", children:[]};
  const d = {id:"d", children:[]};
  const e = {id:"e", children:[]};
  b.children = [c, d];

  const linked = link([a, b, e]);

  t.is(a.next, b);
  t.is(b.next, c);
  t.is(c.next, d);
  t.is(d.next, e);

  t.is(c.prev, b);
  t.is(d.prev, c);
  t.is(e.prev, d);

  t.is(c.parent, b);
  t.is(d.parent, b);
});
