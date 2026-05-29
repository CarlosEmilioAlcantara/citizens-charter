export const fetchAPI = async (route, accessToken = "") => {
  try {
    const res = await fetch(route, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        ...(accessToken && { "Authorization": `Bearer ${accessToken}` })
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    };
  } catch (err) {
    console.error(err);
  }
}
