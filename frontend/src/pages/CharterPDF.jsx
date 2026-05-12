// TODO;
// [] 1) Generate pdfs
// [] 2) Regnerate pdf
// [*] 3) Download pdf
// [] 4) Delete pdf

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { 
  fetchCharterPDFs, 
  downloadCharterPDF, 
  generateCharterPDFs, 
} from "../apis/CharterPDFAPI";
import { FaEye, FaFileDownload, FaPrint } from "react-icons/fa";
import Table from "../components/Table";
import Dropdown from "../components/Dropdown";
import DropdownLabel from "../components/DropdownLabel";
import PDFViewer from "../components/PDFViewer";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import Search from "../components/Search";

export default function CharterPDF() {
  const [pdfs, setPdfs] = useState([]);
  const [search, setSearch] = useState("");
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [count, setCount] = useState("");
  const [url, setUrl] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const { authTokens } = useContext(AuthContext);

  const handleGenerate = async () => { 
    setLoading(true);
    try {
      const res = await generateCharterPDFs(authTokens);

      setToast({ 
        success: res.ok, 
        message: `${res.ok && "PDFs Generated" || "PDF Generation Fail"}` 
      });
    } finally {
      setLoading(false);
    }
  }

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
      <Loader show={loading} message={"Naglilikha ng mga PDFs"} />
      <Sidebar/>

      <div className="">
        <h2 className="text-xl font-bold">
          Karta ng Mamamayan ng Lahat ng Opisina
        </h2>
        <Button 
          label={"Lumikha mga PDF"} 
          icon={<FaPrint />} 
          onClick={handleGenerate}
        />
        <Search />
      </div>

      <Table 
        headers={["PDF", "Actions"]}
        body={pdfs}
        hideID={true}
      />
      {url && (
        <PDFViewer url={url} onClose={() => {setUrl(null)}}/>
      )}

      {toast && (
        <Alert 
          success={toast.success} 
          message={toast.message} 
          timeout={3000} 
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}