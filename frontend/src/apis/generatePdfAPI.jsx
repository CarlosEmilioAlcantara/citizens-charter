export const generatePdfAPI = async (
  authTokens, 
  route, 
  method, 
) => {
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
    const blob = await res.blob();
    return {res: res, url: URL.createObjectURL(blob)};
  } catch (err) {
    console.error(err);
  }
}