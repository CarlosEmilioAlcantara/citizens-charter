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

export { fetchCharterPDFs }