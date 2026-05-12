// TODO;
// [] 1) Generate pdfs
// [] 2) Regnerate pdf
// [*] 3) Download pdf
// [] 4) Delete pdf

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { fetchCharterPDFs, downloadCharterPDF } from "../apis/CharterPDFAPI";
import { FaEye, FaFileDownload, FaPrint } from "react-icons/fa";
import Table from "../components/Table";
import Dropdown from "../components/Dropdown";
import DropdownLabel from "../components/DropdownLabel";
import PDFViewer from "../components/PDFViewer";
import Button from "../components/Button";

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
        "name": <DropdownLabel icon={<FaEye />} label={"Tingnan PDF"}/>, 
        "function": () => {setUrl(data["pdf"])},
      },
      {
        "name": <DropdownLabel 
          icon={<FaFileDownload />} 
          label={"Download PDF"}
        />, 
        "function": () => downloadCharterPDF(data["id"]),
      },
    ]}/>);
  })

  return(
    <div className="mt-5 ml-22">
      <Sidebar/>

      <div className="">
        <Button label={"Lumikha mga PDF"} icon={<FaPrint />}/>
        <h2 className="text-xl font-bold">
          Karta ng Mamamayan ng Lahat ng Opisina
        </h2>
      </div>

      <Table 
        headers={["PDF", "Actions"]}
        body={pdfs}
        hideID={true}
      />
      {url && (
        <PDFViewer url={url} onClose={() => {setUrl(null)}}/>
      )}
    </div>
  );
}