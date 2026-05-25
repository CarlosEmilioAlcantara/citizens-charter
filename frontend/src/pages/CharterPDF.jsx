import { useEffect, useState } from "react";
import Navigation from "../components/navigation/Navigation";
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
import useTableControls from "../utils/useTableControls";
import refreshList from "../utils/refreshList";
import useWindowWidth from "../utils/useWindowWidth";
import { isDesktop } from "../utils/isDesktop";
import { isTablet } from "../utils/isTablet";
import Button from "../components/buttons/Button";
import Search from "../components/inputs/Search";
import PageSizeSelector from "../components/table_controls/PageSizeSelector";
import TableHeader from "../components/table/TableHeader";
import Table from "../components/table/Table";
import ListMobile from "../components/list/ListMobile";
import Dropdown from "../components/dropdowns/Dropdown";
import DropdownItem from "../components/dropdowns/DropdownItem";
import EntriesCounter from "../components/table_controls/EntriesCounter";
import Pager from "../components/table_controls/Pager";
import PDFViewer from "../components/modals/PDFViewer";
import Loader from "../components/modals/Loader";
import Alert from "../components/modals/Alert";
import ButtonGroup from "../components/buttons/ButtonGroup";

export default function CharterPDF() {
  const { authTokens } = useContext(AuthContext);
  const [
    route,
    setRoute,
    items,
    search,
    setSearch,
    pageSize,
    setPageSize,
    ordering,
    setOrdering,
    prev,
    next,
    count,
    currentPage,
    setCurrentPage,
    total,
    handlePaging,
  ] = usePaging(fetchAPI)
  const {
    dropdown, 
    pageSizeSelector, 
    closeControls,
    togglePageSizeSelector,
    toggleDropdown,
  } = useTableControls();
  const [toast, setToast, loading, handleLoading] = useLoader();
  const [windowWidth] = useWindowWidth();
  const [url, setUrl] = useState("");

  useEffect(() => {
    setRoute("/api/pdf/citizens-charters");
  }, [setRoute]);

  isTablet(windowWidth) && Object.entries(items).map(([key, data]) => {
    data["actions"] = (
      <Dropdown 
        key={key} 
        label={"Aksyon"} 
        isOpen={dropdown === key}
        toggle={() => toggleDropdown(key)}
        items={[
          {
            "label": <DropdownItem icon={<FaEye />} label={"Tingnan PDF"}/>, 
            "function": () => {
              isDesktop(windowWidth) ? 
              setUrl(data["pdf"]) : window.open(data["pdf"], "_blank");
            },
          },
          {
            "label": <DropdownItem 
              icon={<FaFileDownload />} 
              label={"Download PDF"}
            />, 
            "function": () => downloadCharterPDF(data["id"]),
          },
          {
            "label": <DropdownItem 
              icon={<TbReload />} 
              label={"Regenerate PDF"}
            />, 
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
                ordering: ordering,
                timeout: 300,
              });
            },
          },
          {
            "label": <DropdownItem 
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
                ordering: ordering,
                timeout: 300,
              });
            },
          },
        ]}
    />);
  }) || Object.entries(items).map(([key, data]) => {
    data["actions"] = (
      <ButtonGroup key={key} buttons={[
        <Button 
          label={"Tingnan PDF"} 
          icon={<FaEye />} 
          full={true} 
          onClick={() => window.open(data["pdf"], "_blank")}
        />,
        <Button 
          label={"Download PDF"} 
          icon={<FaFileDownload />} 
          full={true} 
          onClick={() => downloadCharterPDF(data["id"])}
        />,
        <Button 
          label={"Regenerate PDF"} 
          icon={<TbReload />} 
          full={true} 
          onClick={async () => { 
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
              ordering: ordering,
              timeout: 300,
            });
          }}
        />,
        <Button 
          label={"Delete PDF"} 
          icon={<FaTrashAlt />} 
          full={true} 
          remove={true} 
          onClick={async () => { 
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
              ordering: ordering,
              timeout: 300,
            });
          }}
        />,
      ]} />
    )
  })

  return(
    <>
      <Loader show={loading} message={"Naglilikha ng mga PDFs"} />
      <Navigation />
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
              onClick={async () => {
                closeControls();

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
                  ordering: ordering,
                  timeout: 300,
                });
              }}
            />

            <div className="flex gap-3 w-full">
              <Search 
                placeholder={"Ngalan ng opisina"} 
                value={search} 
                setValue={setSearch}
                onClick={closeControls}
              />

              <PageSizeSelector 
                label={pageSize} 
                setPageSize={setPageSize} 
                isOpen={pageSizeSelector}
                toggle={togglePageSizeSelector}
              />
            </div>
          </div>

          {isTablet(windowWidth) ? (
            <Table 
              headers={[
                <TableHeader 
                  label={"PDF"} 
                  order={"name"}
                  setOrdering={setOrdering} 
                  onClick={closeControls}
                />, 
                <TableHeader 
                  label={"Sector"} 
                  order={"sector__name"}
                  setOrdering={setOrdering} 
                  onClick={closeControls}
                />, 
                "Actions",
              ]}
              body={items}
              charterList={true}
            />
          ) : (
            <ListMobile 
              headers={[
                <TableHeader 
                  label={"PDF"} 
                  order={"name"}
                  setOrdering={setOrdering} 
                  onClick={closeControls}
                />, 
                <TableHeader 
                  label={"Sector"} 
                  order={"sector__name"}
                  setOrdering={setOrdering} 
                  onClick={closeControls}
                />, 
              ]}
              body={items}
              charterList={true}
            />
          )}

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
              onClick={closeControls}
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