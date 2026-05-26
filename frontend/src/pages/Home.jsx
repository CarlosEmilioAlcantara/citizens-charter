import { useEffect, useState } from "react";
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
import useToggle from "../hooks/useToggle";
import usePaging from "../hooks/usePaging";
import useTableControls from "../hooks/useTableControls";
import useWindowWidth from "../hooks/useWindowWidth";
import { isDesktop } from "../utils/isDesktop";
import { isTablet } from "../utils/isTablet";
import { FaEye, FaFileDownload } from "react-icons/fa";

export default function Home() {
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
    field,
    setField,
    filter,
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
  ] = usePaging(fetchAPI)
  const {
    dropdown,
    pageSizeSelector, 
    filterSelector,
    closeControls,
    togglePageSizeSelector,
    toggleFilterSelector,
    toggleDropdown,
  } = useTableControls();
  const [state, toggle] = useToggle(true);
  const [windowWidth] = useWindowWidth();
  const [url, setUrl] = useState("");

  useEffect(() => {
    setRoute("/api/pdf/citizens-charters");
    setField("sector__name");
    setFiltersRoute("/api/filters/citizens-charter");
  }, [setRoute, setField, setFiltersRoute]);

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
      ]} />
    )
  })

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
          <h2 className="text-sm font-bold md:text-xl">
            Karta ng Mamamayan ng Lahat ng Opisina
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
              body={items}
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
            <PDFViewer url={url} onClose={() => {setUrl(null)}}/>
          )}
        </div>
      </div>
    </>
  );
}