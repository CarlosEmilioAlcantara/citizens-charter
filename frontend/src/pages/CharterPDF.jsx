// TODO;
// [*] 1) Generate pdfs
// [*] 2) Regnerate pdf
// [*] 3) Download pdf
// [*] 4) Delete pdf

import { useRef, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { fetchAPI } from "../apis/fetchAPI";
import { 
  downloadCharterPDF, 
  generateCharterPDFs, 
  regenerateCharterPDF,
  deleteCharterPDF,
} from "../apis/CharterPDFAPI";
import { FaEye, FaFileDownload, FaPrint, FaTrashAlt } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import useLoader from "../utils/useLoader";
import usePaging from "../utils/usePaging";
import refreshList from "../utils/refreshList";
import Button from "../components/Button";
import Search from "../components/Search";
import PageSizeSelector from "../components/PageSizeSelector";
import TableHeader from "../components/TableHeader";
import Table from "../components/Table";
import Dropdown from "../components/Dropdown";
import DropdownItem from "../components/DropdownItem";
import EntriesCounter from "../components/EntriesCounter";
import Pager from "../components/Pager";
import PDFViewer from "../components/PDFViewer";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

export default function CharterPDF() {
  const [
    route,
    setRoute,
    items,
    search,
    setSearch,
    pageSize,
    setPageSize,
    order,
    setOrder,
    prev,
    next,
    count,
    currentPage,
    setCurrentPage,
    total,
    handlePaging,
  ] = usePaging({ api: fetchAPI })
  const [toast, setToast, loading, handleLoading] = useLoader();
  const { authTokens } = useContext(AuthContext);

  const [url, setUrl] = useState("");

  useEffect(() => {
    setRoute("/api/pdf/citizens-charters");
    setOrder("name");
  }, []);

  Object.entries(items).map(([key, data]) => {
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
      {
        "name": <DropdownItem icon={<TbReload />} label={"Regenerate PDF"}/>, 
        "function": async () => { 
          await handleLoading({
            api: regenerateCharterPDF,
            id: data["office"],
            authTokens: authTokens,
            messageSuccess: "PDF Regenerated",
            messageFail: "PDF Regeneration Failed",
          }); 
          refreshList({
            handlePaging: handlePaging,
            route: route,
            currentPage: currentPage,
            setCurrentPage: setCurrentPage,
            search: search,
            pageSize: pageSize,
            order: order,
            timeout: 300,
          });
        },
      },
      {
        "name": <DropdownItem 
          icon={<FaTrashAlt />} 
          label={"Delete PDF"}
          remove={true}
        />, 
        "function": async () => { 
          await handleLoading({
            api: deleteCharterPDF,
            id: data["id"],
            authTokens: authTokens,
            messageSuccess: "PDF Deleted",
            messageFail: "PDF Deletion Failed",
          }) 
          refreshList({
            handlePaging: handlePaging,
            route: route,
            currentPage: currentPage,
            setCurrentPage: setCurrentPage,
            search: search,
            pageSize: pageSize,
            order: order,
            timeout: 300,
          });
        },
      },
    ]}/>);
  })

  return(
    <>
      <Loader show={loading} message={"Naglilikha ng mga PDFs"} />
      <Sidebar />
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
              label={"Lumikha PDFs"} 
              icon={<FaPrint />} 
              onClick={ async () => {
                await handleLoading({
                  api: generateCharterPDFs, 
                  authTokens: authTokens, 
                  messageSuccess: "PDFs Nalikha", 
                  messageFail:"PDFs Paglikha Fail",
                }); 

                refreshList({
                  handlePaging: handlePaging,
                  route: route,
                  currentPage: currentPage,
                  setCurrentPage: setCurrentPage,
                  search: search,
                  pageSize: pageSize,
                  order: order,
                  timeout: 300,
                });
              }}
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
            headers={[
              <TableHeader label={"PDF"} order={order} setOrder={setOrder}/>, 
              "Actions",
            ]}
            body={items}
            charterList={true}
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
              search={search}
              pageSize={pageSize}
              fetchItems={handlePaging}
              route={route}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
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