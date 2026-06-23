import { useContext, useEffect, useState } from "react";
import { fetchAPI } from "../apis/fetchAPI";
import { genericBulkAPI } from "../apis/genericBulkAPI";
import AuthContext from "../context/AuthContext";
import Navigation from "../components/navigation/Navigation";
import Button from "../components/buttons/Button";
import Search from "../components/inputs/Search";
import Input from "../components/inputs/Input";
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
import Confirmation from "../components/modals/Confirmation";
import useLoader from "../hooks/useLoader";
import usePaging from "../hooks/usePaging";
import useTableControls from "../hooks/useTableControls";
import useWindowWidth from "../hooks/useWindowWidth";
import refreshList from "../utils/refreshList";
// import { isDesktop } from "../utils/isDesktop";
import { isTablet } from "../utils/isTablet";
import { FaTrashAlt, FaSave } from "react-icons/fa";

export default function AdminAudit() {
  const { authTokens } = useContext(AuthContext);
  const {
    accessToken,
    setAccessToken,
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
  const [selectedRows, setSelectedRows] = useState({});
  const [itemIDs, setItemIDs] = useState([]);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    setRoute("/api/admin-audit-logs");
    setField("content_type__model");
    setFiltersRoute("/api/filters/admin-audit");
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
          (field === "content_type_model") ? (
            value?.replace(/^./, str => str.toUpperCase())
          ) : (typeof(value) === "object" && value !== null) ? (
            <TextArea 
              rowkey={key} 
              field={field} 
              value={JSON.stringify(value)}
            /> 
          ) : (
            value
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
              Audit Log ng mga Admin
            </h2>

            <div className="flex flex-col gap-3 w-full sm:flex-row">
              <Search 
                className="flex-1"
                placeholder={"Ngalan ng user"} 
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
                  label={"Tanggalin"} 
                  icon={<FaTrashAlt />} 
                  remove={true}
                  onClick={() => setConfirmation({
                    label: "Magtanggal ng Charter Audit Log",
                    remove: true
                  })}
                />
              </div>
            </div>
          </div>

          {isTablet(windowWidth) ? (
            <Table 
              headers={[
                <TableHeader 
                  label={"Model"} 
                  order={"content_type__model"}
                  setOrdering={setOrdering} 
                  onClick={closeControls}
                />, 
                <TableHeader 
                  label={"Aksyon"} 
                  order={"action_name"}
                  setOrdering={setOrdering} 
                  onClick={closeControls}
                />, 
                "Data",
                <TableHeader 
                  label={"User"} 
                  order={"actor__name"}
                  setOrdering={setOrdering} 
                  onClick={closeControls}
                />, 
                <div className="flex flex-col items-center">
                  <TableHeader 
                    label={"Timestamp"} 
                    order={"timestamp"}
                    setOrdering={setOrdering} 
                    onClick={closeControls}
                  />
                  <span>(mm-dd-yyyy hh:mm:ss)</span>
                </div>,
              ]}
              body={tableItems}
              charterAudit={true}
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

          {confirmation && (
            <Confirmation 
              label={confirmation.label}
              func={async () => {
                closeControls();

                setLoadingMessage("Nagtatanggal ng Charter Audit Log");
                await handleLoading({
                  api: genericBulkAPI, 
                  body: selectedRows,
                  route: "/api/audit-log/delete",
                  method: "DELETE",
                  authTokens: authTokens, 
                  messageSuccess: "Charter Audit Log Delete Matagumpay", 
                  messageFail:"Charter Audit Log Delete Fail",
                }); 

                setSelectedRows({});
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
              }}
              remove={confirmation.remove}
              onClose={() => setConfirmation(null)}
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