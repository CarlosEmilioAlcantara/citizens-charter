export const fetchAPI = async (route) => {
  try {
    const res = await fetch(route, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    };
  } catch (err) {
    console.error(err);
  }
}
