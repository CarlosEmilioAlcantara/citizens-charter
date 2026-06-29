export const genericAPI = async (
  route, 
  method, 
  authTokens, 
  body = null,
  download = "",
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
      body: 
        (body && method === "POST") || method === "PUT" ?
          JSON.stringify(body) :
          undefined
    });
    if (download) {
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = download;
      link.click();
      URL.revokeObjectURL(link.href);
    }
    return res; 
  } catch (err) {
    console.error(err);
  }
}