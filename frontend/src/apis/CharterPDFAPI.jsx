const fetchCharterPDFs = async () => {
  try {
    const res = await fetch("/api/pdf/citizens-charters", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

const viewCharterPDF = async (id) => {
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

export { fetchCharterPDFs, viewCharterPDF }