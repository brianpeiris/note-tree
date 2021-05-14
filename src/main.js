import App from "./App.svelte";
import { randomId, link } from "./items.js";

let json;
if (localStorage.getItem("items")) {
  json = localStorage.getItem("items");
} else {
  json = JSON.stringify([{ id: randomId(), content: "", children: [] }]);
}

const parsed = JSON.parse(json);

const id = new URLSearchParams(location.search).get("id");

function find(items, id, path) {
  for (const item of items) {
    if (item.id === id) return { items: item.children, path: path.concat(item) };
    if (item.children.length) {
      const found = find(item.children, id, path.concat(item));
      if (found) return found;
    }
  }
}

let deep;
if (id) deep = find(parsed, id, []);

const app = new App({
  target: document.body,
  props: {
    path: deep && deep.path || [],
    full: parsed,
    items: link((deep && deep.items) || parsed),
  },
});

export default app;
