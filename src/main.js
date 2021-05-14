import App from "./App.svelte";
import { randomId, link } from "./items.js";


const app = new App({
  target: document.body,
  props: {
    items: link([
      { id: randomId(), content: " one    fizz buzz  spam", children: [] },
      {
        id: randomId(),
        content: "two",
        children: [
          { id: randomId(), content: "a", children: [] },
          { id: randomId(), content: "e", children: [
            { id: randomId(), content: "e2", children: [
              { id: randomId(), content: "ea", children: [] },
            ] },
          ] },
        ],
      },
      { id: randomId(), content: "three", children: [] },
    ]),
  },
});

export default app;
