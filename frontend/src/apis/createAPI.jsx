export const createAPI = async (createRoute, authTokens, body) => {
  try {
    const res = await fetch(createRoute, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...(authTokens.access && { 
            "Authorization": `Bearer ${authTokens.access}` 
          })
      },
      body: JSON.stringify(body),
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}