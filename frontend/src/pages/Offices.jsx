import { useContext, useEffect, useState } from "react";
import { fetchAPI } from "../apis/fetchAPI";
import { genericBulkAPI } from "../apis/genericBulkAPI";
import AuthContext from "../context/AuthContext";
import Navigation from "../components/navigation/Navigation";
import Button from "../components/buttons/Button";
import Search from "../components/inputs/Search";
import Input from "../components/inputs/Input";
import Listbox from "../components/inputs/Listbox";
import FilterSelector from "../components/table_controls/FilterSelector";
import PageSizeSelector from "../components/table_controls/PageSizeSelector";
import TableHeader from "../components/table/TableHeader";
import Table from "../components/table/Table";
import ListMobile from "../components/list/ListMobile";
import Dropdown from "../components/dropdowns/Dropdown";
import DropdownItem from "../components/dropdowns/DropdownItem";
import SectorSelector from "../components/dropdowns/SectorSelector";
import EntriesCounter from "../components/table_controls/EntriesCounter";
import Pager from "../components/table_controls/Pager";
import Loader from "../components/modals/Loader";
import Alert from "../components/modals/Alert";
import Checkbox from "../components/buttons/Checkbox";
import TextArea from "../components/inputs/TextArea";
import Preview from "../components/modals/Preview";
import ButtonGroup from "../components/buttons/ButtonGroup";
import AddItem from "../components/modals/AddItem";
import Confirmation from "../components/modals/Confirmation";
import useValues from "../hooks/useValues";
import useLoader from "../hooks/useLoader";
import usePaging from "../hooks/usePaging";
import useTableControls from "../hooks/useTableControls";
import useWindowWidth from "../hooks/useWindowWidth";
import useListInfo from "../hooks/useListInfo";
import refreshList from "../utils/refreshList";
// import { isDesktop } from "../utils/isDesktop";
import { isTablet } from "../utils/isTablet";
import { checkResponse } from "../utils/checkResponse";
import { changeSector } from "../utils/changeSector";
import { 
  FaEye, 
  FaFileDownload, 
  FaPrint, 
  FaTrashAlt, 
  FaPlus,
  FaSave,
} from "react-icons/fa";

export default function Offices() {
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
    dropdown,
    pageSizeSelector, 
    filterSelector,
    closeControls,
    togglePageSizeSelector,
    toggleFilterSelector,
    toggleDropdown,
  } = useTableControls();
  const {toast, setToast, loading, handleLoading} = useLoader();
  const [windowWidth] = useWindowWidth();
  const [preview, setPreview] = useState(null);
  const [selectedRows, setSelectedRows] = useState({});
  const [itemIDs, setItemIDs] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const {values, setValues, data, setData} = useValues([
    "name", "sector", "sector_name",
  ])
  const [listInfo] = useListInfo({
    route: "/api/sectors-info", 
    accessToken: authTokens.access,
  });

  useEffect(() => {
    setRoute("/api/offices");
    setField("sector__name");
    setFiltersRoute("/api/filters/sector");
    setAccessToken(authTokens.access);
  }, [setRoute, setAccessToken, setField, setFiltersRoute, authTokens.access])

  useEffect(() => {
    setItemIDs(Object.values(items).map(item => item.id));
  }, [setItemIDs, items])

  const listboxItems = Object.entries(listInfo).map(([_, data]) => ({
    ...data,
    onClick: () =>
      setValues(prev => ({
        ...prev,
        sector: data.id,
      })),
  }));

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
          (field === "employee_names") ? 
            <ButtonGroup key={key} buttons={[
              <Button
                disabled={data["employee_names"].length < 1}
                label={"Tingnan mga Kawani"}
                icon={<FaEye />}
                full={true}
                onClick={() => setPreview({
                  label: data["name"],
                  tableLabel: "Mga Kawani",
                  items: data["employee_names"].map((employee) => ({employee})),
                })}
              />,
              <Button
                disabled={data["position_names"].length < 1}
                label={"Tingnan mga Posisyon"}
                icon={<FaEye />}
                full={true}
                onClick={() => setPreview({
                  label: data["name"],
                  tableLabel: "Mga Posisyon",
                  items: data["position_names"].map((position) => ({position})),
                })}
              />,
            ]}
          />
          : (
            field === "sector" ||
            field === "position_names"  
          ) ?
            null 
          : (field === "sector_name") ?
            <SectorSelector 
              key={key}
              rowkey={key}
              label={data["sector_name"]}
              disabled={!selectedRows[data.id]}
              sectors={listInfo}
              setItems={setItems}
              changeSector={changeSector}
              isOpen={dropdown === key}
              toggle={() => toggleDropdown(key)}
            />
          : ( 
            field === "service_count"
          ) ? (
            <span key={key}>
              Serbisyo:{data["service_count"]}<br />
              Kawani:{data["user_count"]}<br />
              Posisyon:{data["position_count"]}<br />
            </span>
          ) : (
            field === "user_count" || 
            field === "position_count" 
          ) ? (
            null
          ) : (
            <TextArea 
              rowkey={key} 
              field={field} 
              value={value}
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
              Mga Opisina ng Pamahalaang Lungsod
            </h2>
            <Button 
              label={"Magdagdag"} 
              icon={<FaPlus />} 
              onClick={() => {closeControls(); setShowAdd(true);}}
            />

            <div className="flex flex-col gap-3 w-full sm:flex-row">
              <Search 
                className="flex-1"
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
                  label={"Save Inedit"} 
                  icon={<FaSave />} 
                  onClick={() => setConfirmation({label: "Edit ng Opisina"})}
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
                    label: "Magtanggal ng Opisina",
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
                "Rami ng Serbisyo, Kawani, Posisyon",
                "Aksyon",
              ]}
              body={tableItems}
              hideID={true}
              officeList={true}
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
            <AddItem 
              onClose={() => {setShowAdd(false)}} 
              label={"Magdagdag ng Opisina"}
              sector={true}
              setData={setData}
              inputs={[
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
                <Listbox items={listboxItems} />
              ]}
              addFunc={async () => {
                const res = await handleLoading({
                  api: genericBulkAPI, 
                  body: values,
                  route: "/api/office/create",
                  method: "POST",
                  authTokens: authTokens, 
                  messageSuccess: "Opisina Dagdag Matagumpay", 
                  messageFail:"Opisina Dagdag Pumalya",
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

                setValues((prev) => {
                  const reset = Object.keys(prev).map(key => [key, '']);
                  return Object.fromEntries(reset);
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
                        api: genericBulkAPI, 
                        body: selectedRows,
                        route: "/api/office/delete",
                        method: "DELETE",
                        authTokens: authTokens, 
                        messageSuccess: "Opisina Delete Matagumpay", 
                        messageFail:"Opisina Delete Pumalya",
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
                        api: genericBulkAPI,
                        body: editedItems,
                        route: "/api/office/update",
                        method: "PUT",
                        authTokens: authTokens,
                        messageSuccess: "Opisina Update Matagumpay",
                        messageFail: "Opisina Update Pumalya",
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