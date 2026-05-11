// TODO;
// [] 1) Generate pdfs
// [] 2) Regnerate pdf
// [*] 3) Download pdf
// [] 4) Delete pdf

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { fetchCharterPDFs, downloadCharterPDF } from "../apis/CharterPDFAPI";
import Table from "../components/Table";
import Dropdown from "../components/Dropdown";
import PDFViewer from "../components/PDFViewer";

export default function CharterPDF() {
  const [pdfs, setPdfs] = useState([]);
  const [search, setSearch] = useState("");
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [count, setCount] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetchCharterPDFs().then(data => {
      setPdfs(data.results);
      setPrev(data.previous);
      setNext(data.next);
      setCount(data.count);
    });
  }, [])

  Object.entries(pdfs).map(([key, data]) => {
    data["actions"] = (<Dropdown items={[
      {
        "name": "Tingnan PDF", 
        "function": () => {setUrl(data["pdf"])},
      },
      {
        "name": "Download PDF", 
        "function": () => downloadCharterPDF(data["id"]),
      },
    ]}/>);
  })

  return(
    <div className="mt-5 ml-22">
      <Sidebar/>
      <Table 
        headers={["PDF", "Actions"]}
        body={pdfs}
        hideID={true}
      />
      {url && (
        <PDFViewer url={url}/>
      )}
    </div>
  );
}