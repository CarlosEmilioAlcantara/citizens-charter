export const checkResponse = async (res, setToast) => {
  if (!res.ok) {
    const data = await res.json();
    setToast({success: false, message: 
      Object.values(data[0])[0]?.[0]?.charAt(0).toUpperCase() + Object.values(data[0])[0]?.[0]?.slice(1)
    });
    return false;
  } else { 
    return true;
  }
}