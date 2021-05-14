export function link(items, parent) {
  for (const item of items) {
    item.parent = parent;
    item.arr = items;
    if (item.children && item.children.length) {
      link(item.children, item);
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
