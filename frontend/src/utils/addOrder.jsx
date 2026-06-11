export const addOrder = (ordering, order, nextState) => {
  const labels = ordering ? ordering.split(",") : [];
  const filtered = labels.filter(
    label => label !== order && label !== `-${order}`
  );

  let newOrder;
  if (order === "timestamp" || order === "-timestamp") {
    newOrder = nextState ? "-timestamp" : "timestamp";
  } else {
    newOrder = nextState ? order : `-${order}`;
  }

  filtered.push(newOrder);
  return filtered.join(",");
}