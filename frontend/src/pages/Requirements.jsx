import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAPI } from "../apis/fetchAPI";
import { genericAPI } from "../apis/genericAPI";
import { genericBulkAPI } from "../apis/genericBulkAPI";
import AuthContext from "../context/AuthContext";
import Navigation from "../components/navigation/Navigation";
import Button from "../components/buttons/Button";
import Input from "../components/inputs/Input";
import Search from "../components/inputs/Search";
import PageSizeSelector from "../components/table_controls/PageSizeSelector";
import TableHeader from "../components/table/TableHeader";
import Table from "../components/table/Table";
import EntriesCounter from "../components/table_controls/EntriesCounter";
import Pager from "../components/table_controls/Pager";
import Loader from "../components/modals/Loader";
import Alert from "../components/modals/Alert";
import Checkbox from "../components/buttons/Checkbox";
import TextArea from "../components/inputs/TextArea";
import AddEditItem from "../components/modals/AddEditItem";
import Confirmation from "../components/modals/Confirmation";
import useValues from "../hooks/useValues";
import useLoader from "../hooks/useLoader";
import usePaging from "../hooks/usePaging";
import useTableControls from "../hooks/useTableControls";
import refreshList from "../utils/refreshList";
import { FaPlus, FaTrashAlt, FaSave } from "react-icons/fa";

export default function Requirements() {
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
    closeControls,
    togglePageSizeSelector,
  } = useTableControls();
  const {
    toast, 
    setToast, 
    loading, 
    handleLoading,
    loadingMessage,
    setLoadingMessage,
  } = useLoader();
  const { serviceID } = useParams();
  const [selectedRows, setSelectedRows] = useState({});
  const [itemIDs, setItemIDs] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const {values, setValues, data, setData} = useValues([
    "name", "where_to_secure", "service"
  ]);

  useEffect(() => {
    setRoute(`/api/service/${serviceID}/requirements`);
    setAccessToken(authTokens.access);
    setValues((prev) => ({
      ...prev,
      service: serviceID,
    }))
  }, [
    setRoute, 
    serviceID,
    setAccessToken, 
    authTokens.access,
    setValues,
  ])

  useEffect(() => {
    setItemIDs(Object.values(items).map(item => item.id));
  }, [setItemIDs, items])

  const tableItems = Object.fromEntries(
    Object.entries(items).map(([key, data]) => [
      key,
      { 
        checkbox: (
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
            <TextArea 
              rowkey={key} 
              field={field} 
              value={value}
              selectedRows={selectedRows}
              data={data}
              setItems={setItems}
            />
          ])
        )
      }
    ])
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
              Update Tseklist ng mga Kinakailangan
            </h2>
            <Button 
              label={"Magdagdag"} 
              icon={<FaPlus />} 
              onClick={() => {closeControls(); setShowAdd(true);}}
            />

            <div className="flex flex-col gap-3 w-full sm:flex-row">
              <Search 
                className="flex-1"
                placeholder={"Ngalan ng kinakailangan"} 
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

          <Table 
            headers={[
              <TableHeader 
                label={"Kinakailangan"} 
                order={"name"}
                setOrdering={setOrdering} 
                onClick={closeControls}
              />, 
              <TableHeader 
                label={"Tutunguan"} 
                order={"where_to_secure"}
                setOrdering={setOrdering} 
                onClick={closeControls}
              />, 
            ]}
            body={tableItems}
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
                  const reset = Object.keys(prev).map(key => [
                    key,
                    key === "service" ?
                      serviceID :
                      ""
                  ]);
                  return Object.fromEntries(reset);
                });
                setShowAdd(false);
                setData({});
              }} 
              label={"Magdagdag ng Kinakailangan"}
              inputs={[
                <Input 
                  label={"Kinakailangan"}
                  warning={data?.name}
                  type={"text"}
                  placeholder={"Kinakailangan..."}
                  name={"name"}
                  value={values.name}
                  setValue={setValues}
                  small={true}
                />,
                <Input 
                  label={"Tutunguan"}
                  warning={data?.where_to_secure}
                  type={"text"}
                  placeholder={"Tutunguan..."}
                  name={"where_to_secure"}
                  value={values.where_to_secure}
                  setValue={setValues}
                  small={true}
                />,
              ]}
              addFunc={async () => {
                setLoadingMessage("Nagdadagdag ng Kinakailangan");
                const res = await handleLoading({
                  api: genericAPI, 
                  body: values,
                  route: `/api/service/${serviceID}/create-requirement`,
                  method: "POST",
                  authTokens: authTokens, 
                  messageSuccess: "Kinakailangan Dagdag Matagumpay", 
                  messageFail:"Kinakailangan Dagdag Fail",
                }); 

                if (res.ok) {
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
                    timeout: 300,
                  });

                  setValues((prev) => {
                    const reset = Object.keys(prev).map(key => [
                      key,
                      key === "service" ?
                        serviceID :
                        ""
                    ]);
                    return Object.fromEntries(reset);
                  });
                  setShowAdd(false);
                  setData({});
                } else {
                  const data = await res.json();
                  setData(data);
                }
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

                      setLoadingMessage("Nagtatanggal ng Kinakailangan");
                      await handleLoading({
                        api: genericBulkAPI, 
                        body: selectedRows,
                        route: "/api/requirement/delete",
                        method: "DELETE",
                        authTokens: authTokens, 
                        messageSuccess: "Kinakailangan Delete Matagumpay", 
                        messageFail:"Kinakailangan Delete Fail",
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
                        timeout: 300,
                      });
                    }
                  : async () => {
                      closeControls();

                      const editedItems = Object.values(items).filter(
                        item => selectedRows[item.id]
                      );

                      setLoadingMessage("Naguupdate ng Kinakailangan");
                      const res = await handleLoading({
                        api: genericBulkAPI,
                        body: editedItems,
                        route: "/api/kinakailangan/update",
                        method: "PUT",
                        authTokens: authTokens,
                        messageSuccess: "Kinakailangan Update Matagumpay",
                        messageFail: "Kinakailangan Update Fail",
                      });

                      if (res.ok) {
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
                          timeout: 300,
                        });
                      }
                    }
              }
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