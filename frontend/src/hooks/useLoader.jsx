import { useState } from "react";

export default function useLoader() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [toast, setToast] = useState(null);
  
  const handleLoading = async ({
    api, 
    id = null,
    authTokens, 
    messageSuccess, 
    messageFail,
  }) => { 
    setLoading(true);
    try {
      const res = await (id ? api(authTokens, id) : api(authTokens));

      setToast({ 
        success: res.ok, 
        message: `${res.ok && messageSuccess || messageFail}` 
      });
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