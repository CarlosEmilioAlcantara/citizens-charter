import { useContext, useEffect, useState } from "react";
import { fetchAPI } from "../apis/fetchAPI";
import { genericAPI } from "../apis/genericAPI";
import AuthContext from "../context/AuthContext";
import Navigation from "../components/navigation/Navigation";
import Button from "../components/buttons/Button";
import Search from "../components/inputs/Search";
import FilterSelector from "../components/table_controls/FilterSelector";
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
import Checkbox from "../components/buttons/Checkbox";
import TextArea from "../components/inputs/TextArea";
import ButtonGroup from "../components/buttons/ButtonGroup";
import AddItem from "../components/modals/AddItem";
import Confirmation from "../components/modals/Confirmation";
import useLoader from "../hooks/useLoader";
import usePaging from "../hooks/usePaging";
import useTableControls from "../hooks/useTableControls";
import useWindowWidth from "../hooks/useWindowWidth";
import refreshList from "../utils/refreshList";
import { isDesktop } from "../utils/isDesktop";
import { isTablet } from "../utils/isTablet";
import { checkResponse } from "../utils/checkResponse";
import { 
  FaEye, 
  FaFileDownload, 
  FaPrint, 
  FaTrashAlt, 
  FaPlus,
  FaSave,
} from "react-icons/fa";

export default function Sectors() {
  const { authTokens } = useContext(AuthContext);
  const {
    accessToken,
    setAccessToken,
    route,
    setRoute,
    items,
    setItems,
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
  } = usePaging(fetchAPI)
  const {
    pageSizeSelector, 
    filterSelector,
    closeControls,
    togglePageSizeSelector,
    toggleFilterSelector,
  } = useTableControls();
  const {toast, setToast, loading, handleLoading} = useLoader();
  const [windowWidth] = useWindowWidth();
  const [url, setUrl] = useState("");
  const [selectedRows, setSelectedRows] = useState({});
  const [itemIDs, setItemIDs] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [values, setValues] = useState({
    number: '',
    name: '',
  });

  useEffect(() => {
    setRoute("/api/sectors");
    setField("office_count_range");
    setFiltersRoute("/api/filters/sector");
    setAccessToken(authTokens.access);
  }, [setRoute, setAccessToken, setField, setFiltersRoute, authTokens.access])

  useEffect(() => {
    setItemIDs(Object.values(items).map(item => item.id));
  }, [setItemIDs, items])

  const tableItems = Object.fromEntries(
    Object.entries(items).map(([key, data]) => [
      key,
      { checkbox: (
        <Checkbox 
          selectedRows={selectedRows} 
          setSelectedRows={setSelectedRows}
          data={data}
          itemIDs={itemIDs}
        />
      ),
      ...Object.fromEntries(
        Object.entries(data).map(([field, value]) => [
        field,
        field === "office_names" ? (
          <Button 
            label={"Tingnan mga Opisina"} 
            icon={<FaEye />} 
          />
        ) : field === "office_count" ? (
          value
        ) : (
          <TextArea 
            rowkey={key} 
            field={field} 
            value={/\.0$/.test(value) ? value.replace(/\.0$/, "") : value}
            selectedRows={selectedRows}
            data={data}
            setItems={setItems}
          />
        )
      ])
    )}])
  )

  console.log(tableItems)
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
            <h2 
              className="text-sm font-bold md:text-xl"
            >
              Mga Sector ng Pamahalaang Lungsod
            </h2>
            <Button 
              label={"Magdagdag"} 
              icon={<FaPlus />} 
              onClick={() => {closeControls(); setShowAdd(true);}}
            />

            <div className="flex flex-col gap-3 w-full sm:flex-row">
              <Search 
                className="flex-1"
                placeholder={"Ngalan/Numero ng sector"} 
                value={search} 
                setValue={setSearch}
                onClick={closeControls}
              />

              <div className="
                flex 
                flex-col
                gap-1 
                justify-between 
                shrink-0
                sm:justify-end
                sm:flex-row
              ">
                <FilterSelector 
                  setFilter={setFilter}
                  isOpen={filterSelector}
                  toggle={toggleFilterSelector}
                  filters={filters}
                  centerItems={true}
                />

                <PageSizeSelector 
                  label={pageSize} 
                  setPageSize={setPageSize} 
                  isOpen={pageSizeSelector}
                  toggle={togglePageSizeSelector}
                />

                <Button 
                  disabled={
                    !Object.keys(selectedRows).some(
                      id => selectedRows[id] && itemIDs.includes(Number(id))
                    )
                  }
                  label={"Save Inedit"} 
                  icon={<FaSave />} 
                  onClick={() => setConfirmation({label: "Edit ng Sector"})}
                />

                <Button 
                  disabled={
                    !Object.keys(selectedRows).some(
                      id => selectedRows[id] && itemIDs.includes(Number(id))
                    )
                  }
                  label={"Tanggalin"} 
                  icon={<FaTrashAlt />} 
                  remove={true}
                  onClick={() => setConfirmation({
                    label: "Magtanggal ng Sector",
                    remove: true
                  })}
                />
              </div>
            </div>
          </div>

          {isTablet(windowWidth) ? (
            <Table 
              headers={[
                "",
                <TableHeader 
                  label={"#"} 
                  order={"number"}
                  setOrdering={setOrdering} 
                  onClick={closeControls}
                />, 
                <TableHeader 
                  label={"Sector"} 
                  order={"name"}
                  setOrdering={setOrdering} 
                  onClick={closeControls}
                />, 
                "Rami ng Opisina",
                "Aksyon",
              ]}
              body={tableItems}
              sectorList={true}
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
              accessToken={accessToken}
              route={route}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              onClick={() => {closeControls(); setSelectedRows({});}}
            />
          </div>

          {showAdd && (
            <AddItem 
              onClose={() => {setShowAdd(false)}} 
              label={"Magdagdag ng Sector"}
              values={values}
              setValues={setValues}
              addFunc={async () => {
                const res = await handleLoading({
                  api: genericAPI, 
                  body: values,
                  route: "/api/sector/create",
                  method: "POST",
                  authTokens: authTokens, 
                  messageSuccess: "Sector Dagdag Matagumpay", 
                  messageFail:"Sectors Dagdag Pumalya",
                }); 

                if (!res.ok) {return res.json()}

                refreshList({
                  handlePaging: handlePaging,
                  acessToken: accessToken,
                  route: route,
                  currentPage: currentPage,
                  setCurrentPage: setCurrentPage,
                  search: search,
                  pageSize: pageSize,
                  ordering: ordering,
                  field: field,
                  filter: filter,
                  timeout: 300,
                });
                setShowAdd(false);
              }}
            />
          )}
          {confirmation && (
            <Confirmation 
              label={confirmation.label}
              func={
                confirmation.remove
                  ? async () => {
                      closeControls();

                      const res = await handleLoading({
                        api: genericAPI, 
                        body: selectedRows,
                        route: "/api/sector/delete",
                        method: "DELETE",
                        authTokens: authTokens, 
                        messageSuccess: "Sectors Delete Matagumpay", 
                        messageFail:"Sectors Delete Pumalya",
                      }); 

                      checkResponse(res, setToast) && 
                        refreshList({
                          handlePaging: handlePaging,
                          acessToken: accessToken,
                          route: route,
                          currentPage: currentPage,
                          setCurrentPage: setCurrentPage,
                          search: search,
                          pageSize: pageSize,
                          ordering: ordering,
                          field: field,
                          filter: filter,
                          timeout: 300,
                        });

                    }
                  : async () => {
                      closeControls();

                      const editedItems = Object.values(items).filter(
                        item => selectedRows[item.id]
                      );

                      const res = await handleLoading({
                        api: genericAPI,
                        body: editedItems,
                        route: "/api/sector/update",
                        method: "PUT",
                        authTokens: authTokens,
                        messageSuccess: "Sectors Update Matagumpay",
                        messageFail: "Sectors Update Pumalya",
                      });

                      checkResponse(res, setToast) &&
                        refreshList({
                          handlePaging: handlePaging,
                          acessToken: accessToken,
                          route: route,
                          currentPage: currentPage,
                          setCurrentPage: setCurrentPage,
                          search: search,
                          pageSize: pageSize,
                          ordering: ordering,
                          field: field,
                          filter: filter,
                          timeout: 300,
                        });
                    }
              }
              remove={confirmation.remove}
              onClose={() => setConfirmation(null)}
            />
          )}

          {url && (
            <PDFViewer url={url} onClose={() => setUrl(null)} />
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