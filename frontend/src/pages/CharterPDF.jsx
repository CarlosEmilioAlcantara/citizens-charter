// TODO;
// [] 1) Generate pdfs
// [] 2) Regnerate pdf
// [] 3) Download pdf
// [] 4) Delete pdf

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { fetchCharterPDFs, viewCharterPDF } from "../apis/CharterPDFAPI";
import Table from "../components/Table";
import Dropdown from "../components/Dropdown";

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

  Object.entries(pdfs).map(([key, data]) => {
    data["actions"] = (<Dropdown items={[
      (<input 
        type="button" 
        value={"test"} 
        onClick={() => viewCharterPDF(data["id"])}
        className="w-full cursor-pointer text-right"
      />)
    ]}/>);
  })

  return(
    <div className="mt-5 ml-20">
      <Sidebar/>
      <Table 
        headers={["PDF", "Actions"]}
        body={pdfs}
        hideID={true}
      />
    </div>
  );
}