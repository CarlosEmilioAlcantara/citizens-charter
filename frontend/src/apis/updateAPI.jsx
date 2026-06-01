export const updateAPI = async (updateRoute, authTokens, body) => {
  try {
    const res = await fetch(updateRoute, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        ...(authTokens.access && { 
            "Authorization": `Bearer ${authTokens.access}` 
          })
      },
      body: [JSON.stringify(Object.values(body))],
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}