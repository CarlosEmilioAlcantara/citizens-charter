import { useEffect, useState, useRef } from "react";
import { fetchAPI } from "../apis/fetchAPI";
import { downloadCharterPDF } from "../apis/CharterPDFAPI";
import Welcome from "../components/kiosk/Welcome";
import Header from "../components/kiosk/Header";
import Search from "../components/inputs/Search";
import FilterSelector from "../components/table_controls/FilterSelector";
import PageSizeSelector from "../components/table_controls/PageSizeSelector";
import TableHeader from "../components/table/TableHeader";
import Table from "../components/table/Table";
import EntriesCounter from "../components/table_controls/EntriesCounter";
import Pager from "../components/table_controls/Pager";
import PDFViewer from "../components/modals/PDFViewer";
import ListMobile from "../components/list/ListMobile";
import Button from "../components/buttons/Button";
import ButtonGroup from "../components/buttons/ButtonGroup";
import Dropdown from "../components/dropdowns/Dropdown";
import DropdownItem from "../components/dropdowns/DropdownItem";
import Alert from "../components/modals/Alert";
import useToggle from "../hooks/useToggle";
import usePaging from "../hooks/usePaging";
import useTableControls from "../hooks/useTableControls";
import useWindowWidth from "../hooks/useWindowWidth";
import { isTablet } from "../utils/isTablet";
import { isDesktop } from "../utils/isDesktop";
import { FaEye, FaFileDownload } from "react-icons/fa";

export default function Home() {
  const {
    route,
    setRoute,
    items,
    search,
    setSearch,
    pageSize,
    setPageSize,
    setOrdering,
    setField,
    setFilter,
    filters,
    setFiltersRoute,
    prev,
    next,
    count,
    currentPage,
    setCurrentPage,
    total,
    handlePaging,
   } = usePaging(fetchAPI)
  const {
    pageSizeSelector, 
    filterSelector,
    closeControls,
    togglePageSizeSelector,
    toggleFilterSelector,
  } = useTableControls();
  const [toast, setToast] = useState(null);
  const [state, toggle] = useToggle(true);
  const [windowWidth] = useWindowWidth();
  const tap = useRef(0);
  const [kiosk, setKiosk] = useState(false);
  const [url, setUrl] = useState("");

  const handleKiosk = () => {
    if (tap.current < 5 ) { tap.current++ };
    if (tap.current === 5 ) {
      setToast({ 
        success: null, message: "Press 5 more times to enter Kiosk Mode" 
      });
      tap.current++;
    } else if (tap.current > 5 && tap.current < 11 ) { 
      setToast({ 
        success: null,
        message: 
        `Press ${10 - tap.current} more ${10 - tap.current > 1 ? 'times' : 'time'} to enter Kiosk Mode`,
      });
      tap.current++;
    };

    if (tap.current === 11 ) {
      setToast({ success: true, message: "Switched to Kiosk Mode" });
      setKiosk(true);
      tap.current++;
    } else if (tap.current > 11 && tap.current < 17 ) { 
      setToast({ 
        success: null,
        message: `Press ${17 - tap.current} more ${17 - tap.current > 1 ? 'times' : 'time'} to leave Kiosk Mode`,
      });
      tap.current++;
    } else if (tap.current === 17) {
      setToast({ 
        success: true, 
        message: "Left Kiosk Mode",
      });
      setKiosk(false);
      tap.current = 0;
    };
  }

  useEffect(() => {
    setRoute("/api/pdf/citizens-charters");
    setField("sector__name");
    setFiltersRoute("/api/filters/citizens-charter");
  }, [setRoute, setField, setFiltersRoute]);

  Object.entries(items).map(([key, data]) => {
    data["actions"] = (
      <ButtonGroup key={key} buttons={[
        <Button 
          label={"Tingnan PDF"} 
          icon={<FaEye />} 
          full={true} 
          onClick={() => {
            isDesktop(windowWidth) ? 
            setUrl(data["pdf"]) : window.open(data["pdf"], "_blank");
          }}
        />,
        <Button 
          label={"Download PDF"} 
          icon={<FaFileDownload />} 
          full={true} 
          onClick={() => downloadCharterPDF(data["id"])}
        />,
      ]} />
    )
  })

  const kioskItems = Object.fromEntries(
    Object.entries(items).map(([key, data]) => [
      key,
      {
        ...data,
        ...(kiosk && {
          actions: (
            <Button 
              label={"Tingnan PDF"} 
              icon={<FaEye />} 
              onClick={() => setUrl(data["pdf"])}
            />
          )
        })
      }
    ])
  )

  return(
    <>
      <Welcome isOpen={state} toggle={toggle}/>
      <Header toggle={toggle} />
      <div className="
        flex 
        flex-col 
        justify-center 
        items-center
        mt-3 
      ">
        <div className="
          flex 
          flex-col 
          w-[98%]
          gap-2
        ">
          <h2 onClick={handleKiosk} className="text-sm font-bold md:text-xl">
            Karta ng Mamamayan ng Lungsod ng San Pablo
          </h2>
          
          <div className="flex flex-col gap-3 w-full sm:flex-row">
            <Search 
              placeholder={"Ngalan ng opisina"} 
              value={search} 
              setValue={setSearch}
              onClick={closeControls}
            />

            <div className="
              flex 
              flex-col
              gap-1 
              justify-between 
              sm:justify-end
              sm:flex-row
            ">
              <FilterSelector 
                setFilter={setFilter}
                isOpen={filterSelector}
                toggle={toggleFilterSelector}
                filters={filters}
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
                  label={"Opisina"} 
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
              body={kiosk ? kioskItems : items}
              charterList={true}
            />
          ) : (
            <ListMobile 
              headers={[
                <TableHeader 
                  label={"Opisina"} 
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
            <PDFViewer 
              url={url} 
              full={kiosk && true} 
              onClose={() => {setUrl(null)}}
            />
          )}
          {toast && (
            <Alert 
              success={toast.success} 
              message={toast.message} 
              onClose={() => setToast(null)}
            />
          )}
        </div>
      </div>
    </>
  );
}