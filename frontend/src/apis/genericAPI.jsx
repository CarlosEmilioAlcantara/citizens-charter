export const genericAPI = async (route, method, authTokens) => {
  try {
    const res = await fetch(route, {
      method: method,
      headers: { 
        "Content-Type": "application/json",
        ...(authTokens.access && { 
            "Authorization": `Bearer ${authTokens.access}` 
          })
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}