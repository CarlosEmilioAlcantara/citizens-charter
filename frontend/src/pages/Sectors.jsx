import { useContext, useEffect, useState } from "react";
import { fetchAPI } from "../apis/fetchAPI";
import { genericAPI } from "../apis/genericAPI";
import { genericBulkAPI } from "../apis/genericBulkAPI";
import AuthContext from "../context/AuthContext";
import Navigation from "../components/navigation/Navigation";
import Button from "../components/buttons/Button";
import Input from "../components/inputs/Input";
import Search from "../components/inputs/Search";
import FilterSelector from "../components/table_controls/FilterSelector";
import PageSizeSelector from "../components/table_controls/PageSizeSelector";
import TableHeader from "../components/table/TableHeader";
import Table from "../components/table/Table";
import ListMobile from "../components/list/ListMobile";
import EntriesCounter from "../components/table_controls/EntriesCounter";
import Pager from "../components/table_controls/Pager";
import Loader from "../components/modals/Loader";
import Alert from "../components/modals/Alert";
import Checkbox from "../components/buttons/Checkbox";
import TextArea from "../components/inputs/TextArea";
import Preview from "../components/modals/Preview";
import AddEditItem from "../components/modals/AddEditItem";
import Confirmation from "../components/modals/Confirmation";
import useValues from "../hooks/useValues";
import useLoader from "../hooks/useLoader";
import usePaging from "../hooks/usePaging";
import useTableControls from "../hooks/useTableControls";
import useWindowWidth from "../hooks/useWindowWidth";
import refreshList from "../utils/refreshList";
// import { isDesktop } from "../utils/isDesktop";
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
  const {
    toast, 
    setToast, 
    loading, 
    handleLoading,
    loadingMessage,
    setLoadingMessage,
  } = useLoader();
  const [windowWidth] = useWindowWidth();
  const [preview, setPreview] = useState(null);
  const [selectedRows, setSelectedRows] = useState({});
  const [itemIDs, setItemIDs] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const {values, setValues, data, setData} = useValues([
    "number", "name"
  ])

  useEffect(() => {
    setRoute("/api/sectors");
    setField("office_count_range");
    setFiltersRoute("/api/filters/amount");
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
            disabled={data["office_names"].length < 1}
            label={"Tingnan mga Opisina"} 
            icon={<FaEye />} 
            onClick={() => setPreview({
              label: data["name"],
              tableLabel: "Mga Opisina",
              items: data["office_names"].map((office) => ({office})),
            })}
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

  return(
    <>
      <Loader show={loading} message={loadingMessage} />
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
            // <ListMobile 
            //   headers={[
            //     <TableHeader 
            //       label={"#"} 
            //       order={"name"}
            //       setOrdering={setOrdering} 
            //       onClick={closeControls}
            //     />, 
            //     <TableHeader 
            //       label={"Sector"} 
            //       order={"name"}
            //       setOrdering={setOrdering} 
            //       onClick={closeControls}
            //     />, 
            //   ]}
            //   body={items}
            // />
            <></>
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
            <AddEditItem 
              onClose={() => {
                setValues((prev) => {
                  const reset = Object.keys(prev).map(key => [key, '']);
                  return Object.fromEntries(reset);
                });
                setShowAdd(false);
                setData({});
              }} 
              label={"Magdagdag ng Sector"}
              setData={setData}
              inputs={[
                <Input 
                  label={"Number"}
                  warning={data?.number}
                  type={"text"}
                  placeholder={"Number..."}
                  name={"number"}
                  value={values.number}
                  setValue={setValues}
                  small={true}
                />,
                <Input 
                  label={"Name"}
                  warning={data?.name}
                  type={"text"}
                  placeholder={"Name..."}
                  name={"name"}
                  value={values.name}
                  setValue={setValues}
                  small={true}
                />,
              ]}
              addFunc={async () => {
                setLoadingMessage("Nagdadagdag ng Sector");
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
                  accessToken: accessToken,
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

                setValues((prev) => {
                  const reset = Object.keys(prev).map(key => [key, '']);
                  return Object.fromEntries(reset);
                });
                setShowAdd(false);
                setData({});
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

                      setLoadingMessage("Nagtatanggal ng Sector");
                      const res = await handleLoading({
                        api: genericBulkAPI, 
                        body: selectedRows,
                        route: "/api/sector/delete",
                        method: "DELETE",
                        authTokens: authTokens, 
                        messageSuccess: "Sectors Delete Matagumpay", 
                        messageFail:"Sectors Delete Pumalya",
                      }); 
                      setSelectedRows({});

                      checkResponse(res, setToast) && 
                        refreshList({
                          handlePaging: handlePaging,
                          accessToken: accessToken,
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

                      setLoadingMessage("Naguupdate ng Sector");
                      const res = await handleLoading({
                        api: genericBulkAPI,
                        body: editedItems,
                        route: "/api/sector/update",
                        method: "PUT",
                        authTokens: authTokens,
                        messageSuccess: "Sectors Update Matagumpay",
                        messageFail: "Sectors Update Pumalya",
                      });
                      setSelectedRows({});

                      checkResponse(res, setToast) &&
                        refreshList({
                          handlePaging: handlePaging,
                          accessToken: accessToken,
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

          {preview && (
            <Preview 
              label={preview.label} 
              tableLabel={preview.tableLabel}
              items={preview.items}
              onClose={() => setPreview(null)}
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