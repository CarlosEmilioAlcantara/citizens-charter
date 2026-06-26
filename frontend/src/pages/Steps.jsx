import { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchAPI } from "../apis/fetchAPI";
import { genericAPI } from "../apis/genericAPI";
import { genericBulkAPI } from "../apis/genericBulkAPI";
import AuthContext from "../context/AuthContext";
import Navigation from "../components/navigation/Navigation";
import Button from "../components/buttons/Button";
import Input from "../components/inputs/Input";
import Search from "../components/inputs/Search";
import PageSizeSelector from "../components/table_controls/PageSizeSelector";
import TimeSelector from "../components/dropdowns/TimeSelector";
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
import useTimeSelector from "../hooks/useTimeSelector";
import refreshList from "../utils/refreshList";
import { changeTime } from "../utils/changeTime";
import { createTotalTime } from "../utils/createTotalTIme";
import { 
  FaPlus, 
  FaTrashAlt, 
  FaSave, 
  FaChevronLeft, 
  FaClock,
  FaPen,
} from "react-icons/fa";
import DualListbox from "../components/inputs/DualListbox";
import useOfficePositions from "../hooks/useOfficePositions";

export default function Steps() {
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
  const { timeSelector, toggleTimeSelector } = useTimeSelector();
  const [
    positions, 
    setPositions,
    selectedPositions, 
    setSelectedPositions,
  ] = useOfficePositions(accessToken);
  const { serviceID } = useParams();
  const location = useLocation();
  const { number, name } = location.state;
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState({});
  const [itemIDs, setItemIDs] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [showPositionSelector, setPositionSelector] = useState(false);
  const [timeFormat, setTimeFormat] = useState("Seconds");
  const [rowkey, setRowkey] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const {values, setValues, data, setData} = useValues([
    "name", 
    "action", 
    "fee", 
    "legal_basis", 
    "processing_time", 
    "is_subaction",
    "service",
    "position",
  ]);

  useEffect(() => {
    setRoute(`/api/service/${serviceID}/steps`);
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
            (field === "name" && 
              data["is_subaction"] === true
            ) ? (
              <></>
            ) : (field === "processing_time") ? (
              <div className="flex items-center justify-center gap-1">
                <span>{createTotalTime(value)}</span>
                <span>
                  <Button 
                    disabled={!selectedRows[data.id]}
                    icon={<FaClock size={18} />} 
                    iconButton={true}
                    onClick={() => {
                      setRowkey(key);
                      setCurrentTime(data["processing_time"]);
                      setShowTimeSelector(true);
                      setShowAdd(true);
                    }}
                  />
                </span>
              </div>
            ) : (field === "positions") ? (
              <div className="flex items-center justify-center gap-1">
                <span>{value.join(", ")}</span>
                <span>
                  <Button 
                    disabled={!selectedRows[data.id]}
                    icon={<FaPen size={18} />} 
                    iconButton={true}
                    onClick={() => {
                      setRowkey(key);
                      setPositionSelector(true);
                      setShowAdd(true);
                    }}
                  />
                </span>
              </div>
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
        )
      }
    ])
  );

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
              className="flex items-center gap-2 text-sm font-bold md:text-xl"
            >
              <span 
                className="
                  cursor-pointer 
                  transition-all 
                  duration-500 
                  hover:text-unfocused
                "
                onClick={() => navigate("/charter")}
              >
                <FaChevronLeft />
              </span> 
              <span>Update Hakbang ng Kliyente</span>
            </h2>

            <h3
              className="flex items-center gap-2 text-sm md:text-lg"
            >
              <span>
                {
                  /\.00$/.test(number) ? 
                  number.replace(/\.00$/, "") : 
                  /\.([1-9])0$/.test(number) ? 
                  number.replace(/\.([1-9])0$/, ".$1") : 
                  number
                }.
              </span>
              <span>{name}</span>
            </h3>

            <Button 
              label={"Magdagdag"} 
              icon={<FaPlus />} 
              onClick={() => {closeControls(); setShowAdd(true);}}
            />

            <div className="flex flex-col gap-3 w-full sm:flex-row">
              <Search 
                className="flex-1"
                placeholder={"Ngalan ng hakbang"} 
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
                  onClick={() => setConfirmation({label: "Edit ng Hakbang"})}
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
                    label: "Magtanggal ng Hakbang",
                    remove: true
                  })}
                />
              </div>
            </div>
          </div>

          <Table 
            headers={[
              <TableHeader 
                label={"Hakbang"} 
                order={"name"}
                setOrdering={setOrdering} 
                onClick={closeControls}
              />, 
              <TableHeader 
                label={"Gagawin ng Ahensya"} 
                order={"action"}
                setOrdering={setOrdering} 
                onClick={closeControls}
              />, 
              <TableHeader 
                label={"Bayarin"} 
                order={"fee"}
                setOrdering={setOrdering} 
                onClick={closeControls}
              />, 
              <TableHeader 
                label={"Basehang Legal"} 
                order={"legal_basis"}
                setOrdering={setOrdering} 
                onClick={closeControls}
              />, 
              <TableHeader 
                label={"Oras ng Pagproseso"} 
                order={"processing_time"}
                setOrdering={setOrdering} 
                onClick={closeControls}
              />, 
              <TableHeader 
                label={"Taong Responsable"} 
                order={"position"}
                setOrdering={setOrdering} 
                onClick={closeControls}
              />, 
            ]}
            body={tableItems}
            hideID={true}
            stepList={true}
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
              timeSelector={showTimeSelector ? true : false}
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
                setShowTimeSelector(false);
                setPositionSelector(false);
                setData({});
              }} 
              label={
                showTimeSelector ? 
                  "Magupdate ng Oras" :
                  "Magdagdag ng Hakbang"
                }
              inputs={[
                showTimeSelector ? (
                  <TimeSelector 
                    timeFormat={timeFormat}
                    setTimeFormat={setTimeFormat}
                    name={"processing_time"}
                    value={currentTime}
                    setValue={setCurrentTime}
                    rowkey={rowkey}
                    setItems={setItems}
                    isOpen={timeSelector}
                    toggle={toggleTimeSelector}
                  />
                ) : showPositionSelector ? (
                  <DualListbox 
                    items={positions}
                    setPositions={setPositions}
                    selectedPositions={selectedPositions}
                    setSelectedPositions={setSelectedPositions}
                  />
                ) : (
                <Input 
                  label={"Tutunguan"}
                  warning={data?.where_to_secure}
                  type={"text"}
                  placeholder={"Tutunguan..."}
                  name={"where_to_secure"}
                  value={values.where_to_secure}
                  setValue={setValues}
                  small={true}
                />),
              ]}
              addFunc={
                showTimeSelector ? 
                  () => {
                    changeTime(currentTime, timeFormat, setItems, rowkey);
                    setShowAdd(false);
                  }
                : 
                  async () => {
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
                }
              }
            />
          )}
          {confirmation && (
            <Confirmation 
              label={confirmation.label}
              func={
                confirmation.remove
                  ? async () => {
                      closeControls();

                      setLoadingMessage("Nagtatanggal ng Hakbang");
                      await handleLoading({
                        api: genericBulkAPI, 
                        body: selectedRows,
                        route: "/api/step/delete",
                        method: "DELETE",
                        authTokens: authTokens, 
                        messageSuccess: "Hakbang Delete Matagumpay", 
                        messageFail:"Hakbang Delete Fail",
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

                      setLoadingMessage("Naguupdate ng Hakbang");
                      const res = await handleLoading({
                        api: genericBulkAPI,
                        body: editedItems,
                        route: "/api/step/update",
                        method: "PUT",
                        authTokens: authTokens,
                        messageSuccess: "Hakbang Update Matagumpay",
                        messageFail: "Hakbang Update Fail",
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