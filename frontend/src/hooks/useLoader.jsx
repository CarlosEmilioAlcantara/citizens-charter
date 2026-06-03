import { useState } from "react";

export default function useLoader() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [toast, setToast] = useState(null);
  
  const handleLoading = async ({
    api, 
    id = null,
    body = "",
    route = "",
    method = "",
    authTokens, 
    messageSuccess, 
    messageFail,
  }) => { 
    setLoading(true);
    try {
      const res = await (
        id ? 
          api(authTokens, id) : 
        method ?
          api(route, method, authTokens, body) :
        api(authTokens)
      );

      setToast({ 
        success: res.ok, 
        message: `${res.ok && messageSuccess || messageFail}` 
      });

      return res;
    } finally {
      setLoading(false);
    }
  }

  return {
    toast, 
    setToast, 
    loading, 
    handleLoading, 
    loadingMessage, 
    setLoadingMessage,
  };
}