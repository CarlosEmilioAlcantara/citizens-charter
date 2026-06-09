export const genericAPI = async (route, method, authTokens, body = null) => {
  try {
    const res = await fetch(route, {
      method: method,
      headers: { 
        "Content-Type": "application/json",
        ...(authTokens.access && { 
            "Authorization": `Bearer ${authTokens.access}` 
          })
      },
      body: (body && method === "POST") &&
        JSON.stringify(body)
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}