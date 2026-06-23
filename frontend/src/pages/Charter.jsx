import { useContext, useEffect, useState } from "react";
import { fetchAPI } from "../apis/fetchAPI";
import { genericAPI } from "../apis/genericAPI";
import { generateCharterAPI } from "../apis/generateCharterAPI";
import AuthContext from "../context/AuthContext";
import Navigation from "../components/navigation/Navigation";
import Button from "../components/buttons/Button";
import Search from "../components/inputs/Search";
import TextArea from "../components/inputs/TextArea";
import OptionTicker from "../components/buttons/OptionTicker";
import FilterSelector from "../components/table_controls/FilterSelector";
import PageSizeSelector from "../components/table_controls/PageSizeSelector";
import TableHeader from "../components/table/TableHeader";
import Table from "../components/table/Table";
import Dropdown from "../components/dropdowns/Dropdown";
import DropdownItem from "../components/dropdowns/DropdownItem";
import EntriesCounter from "../components/table_controls/EntriesCounter";
import Pager from "../components/table_controls/Pager";
import PDFViewer from "../components/modals/PDFViewer";
import Loader from "../components/modals/Loader";
import Alert from "../components/modals/Alert";
import AddEditService from "../components/modals/AddEditService";
import Confirmation from "../components/modals/Confirmation";
import { useNavigate } from "react-router-dom";
import useLoader from "../hooks/useLoader";
import useSelectItems from "../hooks/useSelectItems";
import usePaging from "../hooks/usePaging";
import useTableControls from "../hooks/useTableControls";
import useWindowWidth from "../hooks/useWindowWidth";
import useValues from "../hooks/useValues";
import refreshList from "../utils/refreshList";
import { isDesktop } from "../utils/isDesktop";
import { FaEye, FaPrint, FaTrashAlt, FaPlus } from "react-icons/fa";
import { MdHomeRepairService, MdChecklistRtl } from "react-icons/md";
import { BsBarChartSteps } from "react-icons/bs";
import { TbReload } from "react-icons/tb";

export default function Charter() {
  const { user, authTokens } = useContext(AuthContext);
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
    dropdown, 
    pageSizeSelector, 
    filterSelector,
    closeControls,
    togglePageSizeSelector,
    toggleFilterSelector,
    toggleDropdown,
  } = useTableControls();
  const {
    toast, 
    setToast, 
    loading, 
    handleLoading,
    loadingMessage,
    setLoadingMessage,
  } = useLoader();
  const {
    selected, 
    setSelected,
  } = useSelectItems();
  const navigate = useNavigate();
  const [windowWidth] = useWindowWidth();
  const [showAdd, setShowAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [url, setUrl] = useState("");
  const [id, setId] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const {values, setValues, data, setData} = useValues([
    "number", 
    "name", 
    "description", 
    "transaction",
    "classification_types",
    "availers",
    "is_subservice",
    "office",
  ]);

  useEffect(() => {
    setRoute("/api/services");
    setAccessToken(authTokens.access);
    setValues((prev) => ({
      ...prev,
      office: user.office_id,
      transaction: "simple",
      is_subservice: false,
    }));
  }, [setRoute, setAccessToken, authTokens.access, setValues, user.office_id]);

  const tableItems = Object.fromEntries(
    Object.entries(items).map(([key, data]) => [
      key,
      { ...Object.fromEntries(
        Object.entries(data).map(([field, value]) => [
          field,
          (field === "number") ? (
            /\.00$/.test(value) ? 
              value.replace(/\.00$/, "") : 
              /\.([1-9])0$/.test(value) ? 
                value.replace(/\.([1-9])0$/, ".$1") : 
                value
          ) : (
            field === "name" || 
            field === "description" ||
            field === "availers"
          ) ? (
            <TextArea 
              rowkey={key} 
              field={field} 
              value={value}
            />
          ) : (
            value
          )
        ])
      ),
      actions: (
        <Dropdown 
          key={key} 
          label={"Aksyon"} 
          isOpen={dropdown === key}
          toggle={() => toggleDropdown(key)}
          items={[
            {
              "label": <DropdownItem 
                icon={<FaEye />} 
                label={"Tingnan Karta"}
              />, 
              "function": async () => {
                setLoadingMessage("Naglilikha ng karta");
                isDesktop(windowWidth) ? 
                  setUrl(await handleLoading({
                    api: generateCharterAPI, 
                    route: `/api/pdf/citizens-charter/${data["id"]}`,
                    authTokens: authTokens, 
                    method: "GET",
                    messageSuccess: "Karta Nalikha", 
                    messageFail:"Karta Paglikha Fail",
                    generateCharter: true,
                  }))
                : 
                  window.open(
                    setUrl(await handleLoading({
                      api: generateCharterAPI, 
                      route: `/api/pdf/citizens-charter/${data["id"]}`,
                      authTokens: authTokens, 
                      method: "GET",
                      messageSuccess: "Karta Nalikha", 
                      messageFail:"Karta Paglikha Fail",
                      generateCharter: true,
                    })),
                    "_blank"
                  )
              },
            },
            {
              "label": <DropdownItem 
                icon={<MdHomeRepairService />} 
                label={"Update Serbisyo"}
              />, 
              "function": () => {
                setEdit(true);
                setShowAdd(true);
                setId(data["id"]);

                const classificationTypes = 
                  data["formatted_classification_types"]
                    .split(',')
                    .map((classification) => classification.toLowerCase())

                setValues((prev) => ({
                  ...prev,
                  number: data["number"],
                  name: data["name"],
                  description: data["description"],
                  transaction: 
                    (data["formatted_transaction"] === "Simple") ?
                      "simple" :
                    (data["formatted_transaction"] === "Komplikado") ?
                      "complicated" :
                    (data["formatted_transaction"] === "Lubhang Teknikal") &&
                      "complicated",
                  classification_types: classificationTypes,
                  availers: data["availers"],
                  is_subservice: data["is_subservice"],
                }));
                setSelected(classificationTypes);
              },
            },
            {
              "label": <DropdownItem 
                icon={<MdChecklistRtl />} 
                label={"Update Kinakailangan"}
              />, 
              "function": () => { 
                navigate(`/service/${data["id"]}`)
              },
            },
            {
              "label": <DropdownItem 
                icon={<BsBarChartSteps />} 
                label={"Update Hakbang"}
              />, 
              // "function": async () => { 
              //   await handleLoading({
              //     api: regenerateCharterPDF,
              //     id: data["office"],
              //     authTokens: authTokens,
              //     messageSuccess: "PDF Regenerated",
              //     messageFail: "PDF Regeneration Failed",
              //   }); 
              //   refreshList({
              //     handlePaging: handlePaging,
              //     route: route,
              //     currentPage: currentPage,
              //     setCurrentPage: setCurrentPage,
              //     search: search,
              //     pageSize: pageSize,
              //     ordering: ordering,
              //     field: field,
              //     filter: filter,
              //     timeout: 300,
              //   });
              // },
            },
            {
              "label": <DropdownItem 
                icon={<FaTrashAlt />} 
                label={"Delete Serbisyo"}
                remove={true}
              />, 
              "function": () => { 
                setId(data["id"]);
                setConfirmation({label: "Delete ng Serbisyo", remove: true});
              },
            },
          ]}
      />)
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
            <h2 className="text-sm font-bold md:text-xl">
              {`Karta ng Mamamayan ng ${user.office_name}`}
            </h2>
            <div className="flex gap-2">
              <Button 
                label={"Magdagdag"} 
                icon={<FaPlus />} 
                onClick={() => {
                  closeControls(); setShowAdd(true); setEdit(false);
                }}
              />
              <Button 
                label={"Lumikha ng Karta"} 
                icon={<FaPrint />} 
                onClick={async () => {
                  closeControls();

                  setLoadingMessage("Naglilikha ng Karta");
                  setUrl(await handleLoading({
                    api: generateCharterAPI, 
                    route: "/api/pdf/citizens-charter",
                    authTokens: authTokens, 
                    method: "GET",
                    messageSuccess: "Karta Nalikha", 
                    messageFail:"Karta Paglikha Fail",
                    generateCharter: true,
                  }))

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
              />
              <Button 
                label={"Lumikha by Opisina"} 
                icon={<FaPrint />} 
                onClick={async () => {
                  // closeControls();

                  // await handleLoading({
                  //   api: generateCharterPDFs, 
                  //   authTokens: authTokens, 
                  //   messageSuccess: "PDFs Nalikha", 
                  //   messageFail:"PDFs Paglikha Fail",
                  // }); 

                  // refreshList({
                  //   handlePaging: handlePaging,
                  //   route: route,
                  //   currentPage: currentPage,
                  //   setCurrentPage: setCurrentPage,
                  //   search: search,
                  //   pageSize: pageSize,
                  //   ordering: ordering,
                  //   field: field,
                  //   filter: filter,
                  //   timeout: 300,
                  // });
                }}
              />
            </div>

            <div className="flex flex-col gap-3 w-full sm:flex-row">
              <Search 
                placeholder={"Numero/Ngalan ng serbisyo"} 
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
          </div>

          <Table 
            headers={[
              <TableHeader 
                label={"#"} 
                order={"number"}
                setOrdering={setOrdering} 
                onClick={closeControls}
              />, 
              <TableHeader 
                label={"Serbisyo"} 
                order={"name"}
                setOrdering={setOrdering} 
                onClick={closeControls}
              />, 
              <TableHeader 
                label={"Deskripsyon"} 
                order={"description"}
                setOrdering={setOrdering} 
                onClick={closeControls}
              />, 
              <TableHeader 
                label={"Uri ng Transaksyon"} 
                order={"transaction"}
                setOrdering={setOrdering} 
                onClick={closeControls}
              />, 
              <TableHeader 
                label={"Klasipikasyon"} 
                order={"classification_types"}
                setOrdering={setOrdering} 
                onClick={closeControls}
              />, 
              <TableHeader 
                label={"Maaring Kumuha"} 
                order={"availers"}
                setOrdering={setOrdering} 
                onClick={closeControls}
              />, 
              "Actions",
            ]}
            body={tableItems}
            serviceList={true}
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
              route={route}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              onClick={closeControls}
            />
          </div>

          {showAdd && (
            <AddEditService 
              onClose={() => {
                setValues((prev) => {
                  const reset = Object.keys(prev).map(key => [key, '']);
                  return Object.fromEntries(reset);
                });
                setShowAdd(false); 
                setEdit(false);
                setData({});
              }} 
              label={`${edit ? 'Magupdate' : 'Magdagdag'} ng Serbisyo`}
              values={values}
              setValues={setValues}
              selected={selected}
              setSelected={setSelected}
              data={data}
              setData={setData}
              edit={edit}
              addFunc={async () => {
                closeControls();

                setLoadingMessage(edit ?
                  "Naguupdate ng Serbisyo" :
                  "Naglilikha ng Serbisyo"
                );
                const res = await handleLoading({
                  api: genericAPI, 
                  route: (edit && id) ? 
                    `/api/service/${id}` : 
                    "/api/service/create",
                  authTokens: authTokens, 
                  method: edit ? "PUT" : "POST",
                  body: values,
                  messageSuccess: edit ? 
                    "Serbisyo Naupdate" : 
                    "Serbisyo Nalikha", 
                  messageFail: edit ? 
                    "Serbisyo Pagupdate Fail" : 
                    "Serbisyo Paglikha Fail",
                });

                if (res.ok) {
                  refreshList({
                    handlePaging: handlePaging,
                    accessToken: authTokens.access,
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
                } else {
                  const data = await res.json()
                  if (data.non_field_errors) {
                    setToast({
                      success: false,
                      message: data.non_field_errors,
                    });
                  }
                  setData(data);
                }
              }}
            />
          )}
          {confirmation && (
            <Confirmation 
              label={confirmation.label}
              func={async () => {
                closeControls();

                setLoadingMessage("Nagtatanggal ng Serbisyo");
                await handleLoading({
                  api: genericAPI, 
                  route: `/api/service/${id}`,
                  method: "DELETE",
                  authTokens: authTokens, 
                  messageSuccess: "Serbisyo Delete Matagumpay", 
                  messageFail:"Serbisyo Delete Fail",
                }); 
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

          {url && (
            <PDFViewer url={url.url} onClose={() => {setUrl(null)}}/>
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