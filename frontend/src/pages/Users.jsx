import { useContext, useEffect, useState } from "react";
import { fetchAPI } from "../apis/fetchAPI";
import { genericAPI } from "../apis/genericAPI";
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
import { FaPen, FaTrashAlt, FaPlus } from "react-icons/fa";

export default function Users() {
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
  const {toast, setToast, loading, handleLoading} = useLoader();
  const [windowWidth] = useWindowWidth();
  const [preview, setPreview] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const {values, setValues, data, setData} = useValues([ "name", "office" ])
  const [user, setUser] = useState(null);
  const [listInfo] = useListInfo({
    route: "/api/offices-info", 
    accessToken: authTokens.access,
  });

  useEffect(() => {
    setRoute("/api/users");
    setField("office__name");
    setFiltersRoute("/api/filters/office");
    setAccessToken(authTokens.access);
  }, [setRoute, setAccessToken, setField, setFiltersRoute, authTokens.access])

  const listboxItems = Object.entries(listInfo).map(([_, data]) => ({
    ...data,
    onClick: () =>
      setValues(prev => ({
        ...prev,
        office: data.id,
      })),
  }));
 
  const tableItems = Object.fromEntries(
    Object.entries(items).map(([key, data]) => [
      key,
      { ...Object.fromEntries(
          Object.entries(data).map(([field, value]) => [
            field,
            value
        ])),
        actions: (
          <ButtonGroup buttons={[
            <Button 
              label={"Edit Kawani"} 
              icon={<FaPen />} 
              full={true} 
              onClick={() => {
                setConfirmation({label: "Edit ng Kawani"});
                setUser(data["id"]);
                console.log(data["id"]);
              }}
            />,
            <Button 
              label={"Delete Kawani"} 
              icon={<FaTrashAlt />} 
              full={true} 
              remove={true}
              onClick={() => {
                setConfirmation({label: "Delete ng Kawani", remove: true});
                setUser(data["id"]);
              }}
            />,
          ]} />
        )
      }
    ])
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
              Mga User ng Sistema
            </h2>
            <Button 
              label={"Magdagdag"} 
              icon={<FaPlus />} 
              onClick={() => {closeControls(); setShowAdd(true);}}
            />

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
              </div>
            </div>
          </div>

          {isTablet(windowWidth) ? (
            <Table 
              headers={[
                <TableHeader 
                  label={"User"} 
                  order={"name"}
                  setOrdering={setOrdering} 
                  onClick={closeControls}
                />, 
                <TableHeader 
                  label={"Opisina"} 
                  order={"office__name"}
                  setOrdering={setOrdering} 
                  onClick={closeControls}
                />, 
                "Aksyon",
              ]}
              body={tableItems}
              hideID={true}
              userList={true}
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
              onClick={() => closeControls()}
            />
          </div>

          {showAdd && (
            <AddItem 
              onClose={() => {setShowAdd(false)}} 
              label={"Magdagdag ng Posisyon"}
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
                  route: "/api/position/create",
                  method: "POST",
                  authTokens: authTokens, 
                  messageSuccess: "Posisyon Dagdag Matagumpay", 
                  messageFail:"Posisyon Dagdag Pumalya",
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
                        api: genericAPI, 
                        route: `/api/user/${user}`,
                        method: "DELETE",
                        authTokens: authTokens, 
                        messageSuccess: "User Delete Matagumpay", 
                        messageFail:"User Delete Pumalya",
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

                      const res = await handleLoading({
                        api: genericAPI,
                        route: `/api/user/${user}`,
                        method: "PUT",
                        authTokens: authTokens,
                        messageSuccess: "User Update Matagumpay",
                        messageFail: "User Update Pumalya",
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