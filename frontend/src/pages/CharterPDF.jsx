import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { fetchCharterPDFs } from "../apis/CharterPDFAPI";

export default function CharterPDF() {
  const [pdfs, setPdfs] = useState([]);
  const [search, setSearch] = useState("");
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [count, setCount] = useState("");

  useEffect(() => {
    fetchCharterPDFs().then(data => {
      setPdfs(data.results);
      setPrev(data.previous);
      setNext(data.next);
      setCount(data.count);
    });
  }, [])

  return(
    <div>
      <Sidebar/>
      <div></div>
    </div>
  );
}