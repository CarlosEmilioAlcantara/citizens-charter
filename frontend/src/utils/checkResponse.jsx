export const checkResponse = async (res, setToast, data) => {
  if (!res.ok) {
    setToast({success: false, message: 
      Object.values(data)[0]?.[0]?.charAt(0).toUpperCase() + Object.values(data)[0]?.[0]?.slice(1)
    });
    return false;
  } else { 
    return true;
  }
}