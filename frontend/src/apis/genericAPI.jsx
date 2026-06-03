export const genericAPI = async (route, method, authTokens, body) => {
  try {
    const res = await fetch(route, {
      method: method,
      headers: { 
        "Content-Type": "application/json",
        ...(authTokens.access && { 
            "Authorization": `Bearer ${authTokens.access}` 
          })
      },
      body: 
        method === "POST" ? 
          JSON.stringify(body) :
        method === "PUT" ? 
          [JSON.stringify(Object.values(body))] :
        method === "DELETE" &&
          JSON.stringify({ ids: Object.keys(body).map(Number) }),
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}