const fetchCharterPDFs = async ({
  page = null, 
  search = "",
  current_page = "",
  page_size = ""
}) => {
  try {
    const res = await fetch(
      page ? page : 
        `/api/pdf/citizens-charters?search=${search}&page=${current_page}&page_size=${page_size}`, 
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (res.ok) {
      return data;
    };
  } catch (err) {
    console.error(err);
  }
}

const downloadCharterPDF = async (id) => {
  try {
    const res = await fetch(`/api/pdf/citizens-charter/download/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/pdf" },
    });
    if (res.ok) {
      const blob = await res.blob();
      const disposition = await res.headers.get("Content-Disposition")
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = disposition.split(/filename=/).pop();
      link.click();
      window.URL.revokeObjectURL(url);
    };
  } catch (err) {
    console.error(err);
  }
}

const generateCharterPDFs = async (authTokens) => {
  try {
    const res = await fetch("/api/pdf/citizens-charter/generate", {
      method: "PUT",
      headers: { "Authorization": `Bearer ${authTokens.access}`}
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}

const regenerateCharterPDFs = async (authTokens, id) => {
  try {
    const res = await fetch(`/api/pdf/citizens-charter/regenerate/${id}`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${authTokens.access}`}
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}

export { 
  fetchCharterPDFs, 
  downloadCharterPDF, 
  generateCharterPDFs,
  regenerateCharterPDFs,
}