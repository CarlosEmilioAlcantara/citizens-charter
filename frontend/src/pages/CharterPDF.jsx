// TODO;
// [*] 1) Generate pdfs
// [] 2) Regnerate pdf
// [*] 3) Download pdf
// [] 4) Delete pdf

import { use, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { 
  fetchCharterPDFs, 
  downloadCharterPDF, 
  generateCharterPDFs, 
} from "../apis/CharterPDFAPI";
import { FaEye, FaFileDownload, FaPrint } from "react-icons/fa";
import Button from "../components/Button";
import Search from "../components/Search";
import PageSizeSelector from "../components/PageSizeSelector";
import Table from "../components/Table";
import Dropdown from "../components/Dropdown";
import DropdownItem from "../components/DropdownItem";
import EntriesCounter from "../components/EntriesCounter";
import Pager from "../components/Pager";
import PDFViewer from "../components/PDFViewer";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

export default function CharterPDF() {
  const [pdfs, setPdfs] = useState([]);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [url, setUrl] = useState("");
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [count, setCount] = useState(null);
  const [total, setTotal] = useState(null);
  const [route, setRoute] = useState("/api/pdf/citizens-charters");
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

  const handlePaging = async (page) => {
    fetchCharterPDFs({ 
      page: page, 
      search: search, 
      page_size: pageSize, 
    }).then(data => {
      setPdfs(data.results);
      setPrev(data.previous);
      setNext(data.next);
      setCount(data.count);
    });
  }

  useEffect(() => {
    fetchCharterPDFs({search: search, page_size: pageSize }).then(data => {
      setPdfs(data.results);
      setPrev(data.previous);
      setNext(data.next);
      setCount(data.count);
    });
  }, [search, pageSize])

  useEffect(() => {
    setTotal(pdfs.length)
  }, [pdfs])

  Object.entries(pdfs).map(([key, data]) => {
    data["actions"] = (<Dropdown label={"Aksyon"} items={[
      {
        "name": <DropdownItem icon={<FaEye />} label={"Tingnan PDF"}/>, 
        "function": () => {setUrl(data["pdf"])},
      },
      {
        "name": <DropdownItem 
          icon={<FaFileDownload />} 
          label={"Download PDF"}
        />, 
        "function": () => downloadCharterPDF(data["id"]),
      },
    ]}/>);
  })

  return(
    <>
      <Loader show={loading} message={"Naglilikha ng mga PDFs"} />
      <Sidebar/>
      <div className="
        flex 
        flex-col 
        justify-center 
        items-center
        mt-16 
        md:mt-5 
        md:ml-22
      ">
        <div className="
          flex 
          flex-col 
          w-[98%]
          gap-2
        ">
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-sm font-bold md:text-xl">
              Karta ng Mamamayan ng Lahat ng Opisina
            </h2>
            <Button 
              label={"Lumikha mga PDF"} 
              icon={<FaPrint />} 
              onClick={handleGenerate}
            />

            <div className="flex gap-3 w-full">
              <Search 
                placeholder={"Ngalan ng opisina"} 
                value={search} 
                setValue={setSearch}
              />

              <PageSizeSelector label={pageSize} setValue={setPageSize} />
            </div>
          </div>

          <Table 
            headers={["PDF", "Actions"]}
            body={pdfs}
            hideID={true}
          />
          <div className="
            flex 
            flex-col 
            justify-between 
            items-center 
            p-3 
            gap-3
            md:flex-row
          ">
            <EntriesCounter
              total={total}
              count={count}
            /> 
            <Pager
              count={count}
              next={next}
              prev={prev}
              fetchItems={handlePaging}
              route={route}
            />
          </div>

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
      </div>
    </>
  );
}