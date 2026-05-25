export const addOrder = (ordering, order, nextState) => {
  const labels = ordering ? ordering.split(",") : [];
  const filtered = labels.filter(
    label => label !== order && label !== `-${order}`
  );

  filtered.push(nextState ? order : `-${order}`);
  return filtered.join(",");
}