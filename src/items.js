export function link(items, parent) {
  let prev = null;
  for (const item of items) {
    if (parent) item.parent = parent;
    if (prev) {
      prev.next = item;
      item.prev = prev;
    }
    if (item.children && item.children.length) {
      link(item.children, item);
      item.next = item.children[0];
      item.children[0].prev = item;
      prev = item.children[item.children.length - 1];
    } else {
      prev = item;
    }
  }
  return items;
}

export function randomId() {
  const chars = "abcdefghijkmnpqrstwxyz234789";
  return Array.from({ length: 8 })
    .map((_) => chars[Math.floor(Math.random() * chars.length)])
    .join("");
};
