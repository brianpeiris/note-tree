import App from "./App.svelte";
import { randomId, link } from "./items.js";


const app = new App({
  target: document.body,
  props: link({
    items: [
      { id: randomId(), content: " one    fizz buzz  spam", children: [] },
      {
        id: randomId(),
        content: "two",
        children: [
          { id: randomId(), content: "hello", children: [] },
          { id: randomId(), content: "world", children: [] },
        ],
      },
      { id: randomId(), content: "three", children: [] },
    ],
  }),
});

export default app;
